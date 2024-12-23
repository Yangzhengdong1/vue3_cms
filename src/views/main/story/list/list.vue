<template>
  <div class="story-list">
    <div class="comment-list" ref="listRef">
      <template v-for="item in list" :key="item.wid">
        <div class="comment-item" ref="itemRef">
          <div class="comment-content">{{ item.content }}</div>
          <div class="comment-footer">
            <span class="user-name">--- {{ item.utterer }}</span>
            <span class="comment-time">{{ item.timeAgo }}</span>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed, onMounted } from "vue";
  import { useStore } from "@/store";

  const store = useStore();
  store.dispatch("system/getPageListAction", {
    pageName: "story",
    queryInfo: { pageNum: 1, pageSize: 10 }
  });

  const list = computed(() => store.state.system.storyList);

  // 虚拟列表实现
  const itemRef = ref<InstanceType<typeof HTMLDivElement>>();
  const listRef = ref<InstanceType<typeof HTMLDivElement>>();
  onMounted(() => {
    const observer = new MutationObserver(() => {
      console.log("mutation 监听");
      // 检查所有的子项是否加载完成
      const allLoaded = [...listRef.value!.children][0].classList.contains(
        "comment-item"
      );

      if (allLoaded) {
        [...listRef.value!.children].forEach((child) => {
          console.log("offsetHeight", child.clientHeight);
        });
      }
    });

    observer.observe(listRef.value as HTMLDivElement, {
      childList: true,
      subtree: true
    });
  });
</script>

<style scoped lang="less">
  .story-list {
    display: flex;
    justify-items: center;
    justify-content: center;
    height: calc(100vh - 90px);
    /* 评论列表容器 */
    .comment-list {
      width: 720px;
      max-height: 700px;
      overflow: auto;
      margin: 10px auto;
      padding: 10px;
      // background-color: #f9f9f9;
      border-radius: 8px;
      // box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      font-family: "Arial", sans-serif;

      /* 单个评论项 */
      .comment-item {
        /* 列表分割线（如果需要） */
        &:not(:last-child) {
          border-bottom: 1px dashed #ebebeb;
          margin-bottom: 15px;
        }
        padding: 15px;
        background: #fff;
        border-radius: 6px;
        border: 1px solid #ebebeb;
        transition: box-shadow 0.2s ease-in-out;
        position: relative;
        /* 评论内容 */
        .comment-content {
          font-size: 14px;
          color: #333;
          line-height: 1.6;
          margin-bottom: 8px;
          text-align: justify;
        }
        /* 用户名和时间部分 */
        .comment-footer {
          display: flex;
          justify-content: flex-end; /* 右对齐 */
          align-items: center;
          font-size: 13px;
          color: #555;
        }

        .user-name {
          font-weight: bold;
          color: #007bff; /* 蓝色强调用户名 */
          margin-right: 10px;
        }
        .comment-time {
          font-size: 12px;
          color: #999;
          font-style: italic; /* 斜体更优雅 */
        }
      }

      .comment-item:hover {
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      }
    }
  }
</style>
