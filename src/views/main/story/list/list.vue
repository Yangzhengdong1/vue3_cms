<template>
  <div class="story-list">
    <div class="comment-list" ref="scrollContainerRef" @scroll="handleScroll">
      <!-- 空 div 用于撑开滚动高度 -->
      <div class="spacer" :style="{ height: `${totalHeight}px` }"></div>

      <!-- 渲染可视区域的 items -->
      <div
        class="visible-items"
        :style="{ transform: `translateY(${offsetTop}px)` }"
      >
        <div v-for="item in renderList" :key="item.wid" class="comment-item">
          <div class="comment-content">{{ item.content }}</div>
          <div class="comment-footer">
            <span class="user-name">--- {{ item.utterer }}</span>
            <span class="comment-time">{{ item.timeAgo }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed, nextTick, watch } from "vue";
  import { useStore } from "@/store";
  import { IStoryList } from "@/service/types/system";

  const store = useStore();
  store.dispatch("system/getPageListAction", {
    pageName: "story",
    queryInfo: {},
    success: () => {
      updateVisibleItems();
      measureHeights();
    }
  });

  // 原始列表
  const list = computed(() => store.state.system.storyList);
  // 渲染列表
  const renderList = ref<IStoryList>([]);

  // 虚拟列表
  const scrollContainerRef = ref<HTMLDivElement | null>(null);
  const itemRefs = ref<Map<string, HTMLDivElement | null>>(new Map());
  const itemHeights = ref<Map<string, number>>(new Map()); // 记录已测量的高度
  const totalHeight = ref(0); // 总高度
  const offsetTop = ref(0); // translateY 偏移量
  const lastScrollTop = ref(0); // 记录上次滚动位置

  // 计算 `totalHeight` 和 `itemHeights`
  const updateTotalHeight = () => {
    let total = 0;
    list.value.forEach((item) => {
      const height = itemHeights.value.get(item.wid) || 95;
      total += height;
    });
    totalHeight.value = total;
  };

  // 计算可见项
  const updateVisibleItems = () => {
    if (!scrollContainerRef.value) return;
    const { scrollTop, clientHeight } = scrollContainerRef.value;
    let startIndex = 0;
    let endIndex = list.value.length - 1;
    let offset = 0;

    // 判断滚动方向
    const isScrollingDown = scrollTop > lastScrollTop.value;
    lastScrollTop.value = scrollTop;

    for (let i = 0; i < list.value.length; i++) {
      const itemHeight = itemHeights.value.get(list.value[i].wid) || 95;
      if (offset + itemHeight >= scrollTop) {
        startIndex = Math.max(0, isScrollingDown ? i - 3 : i - 8);
        break;
      }
      offset += itemHeight;
    }

    let visibleHeight = 0;
    for (let i = startIndex; i < list.value.length; i++) {
      visibleHeight += itemHeights.value.get(list.value[i].wid) || 95;
      if (visibleHeight >= clientHeight) {
        endIndex = Math.min(
          list.value.length - 1,
          i + (isScrollingDown ? 8 : 3)
        );
        break;
      }
    }

    renderList.value = list.value.slice(startIndex, endIndex + 1);
    offsetTop.value = offset; // 通过 `translateY` 调整可见项位置
  };

  // 计算 `height` 并更新
  const measureHeights = () => {
    nextTick(() => {
      let needUpdate = false;
      renderList.value.forEach((item) => {
        const el = itemRefs.value.get(item.wid);
        if (el) {
          const height = el.offsetHeight;
          if (height && height !== itemHeights.value.get(item.wid)) {
            itemHeights.value.set(item.wid, height);
            needUpdate = true;
          }
        }
      });

      if (needUpdate) {
        updateTotalHeight();
      }
    });
  };

  // 监听滚动
  const handleScroll = () => {
    updateVisibleItems();
    measureHeights();
  };

  // 监听可见数据变化，测量高度
  watch(renderList, measureHeights);
</script>

<style scoped>
  .story-list {
    display: flex;
    justify-items: center;
    justify-content: center;
    height: calc(100vh - 90px);
  }

  .comment-list {
    position: relative;
    width: 720px;
    max-height: 700px;
    overflow: auto;
    margin: 10px auto;
    padding: 10px;
    border-radius: 8px;
    font-family: "Arial", sans-serif;
  }

  /* 撑开滚动高度 */
  .spacer {
    width: 100%;
  }

  /* 通过 translateY 调整 items */
  .visible-items {
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
  }

  .comment-item {
    width: 100%;
    padding: 15px;
    background: var(--el-background-color);
    border-radius: 6px;
    border: 1px solid #ebebeb;
    transition: box-shadow 0.2s ease-in-out;
    box-sizing: border-box;
  }

  .comment-item:not(:last-child) {
    border-bottom: 1px dashed #ebebeb;
    margin-bottom: 15px;
  }

  .comment-content {
    font-size: 14px;
    color: var(--v-profile-color-1);
    line-height: 1.6;
    margin-bottom: 8px;
    text-align: justify;
  }

  .comment-footer {
    display: flex;
    justify-content: flex-end;
    font-size: 13px;
    color: var(--v-profile-color-2);
  }

  .user-name {
    font-weight: bold;
    color: var(--el-color-primary);
    margin-right: 10px;
  }

  .comment-time {
    font-size: 12px;
    color: var(--v-profile-color-3);
    font-style: italic;
  }
</style>
