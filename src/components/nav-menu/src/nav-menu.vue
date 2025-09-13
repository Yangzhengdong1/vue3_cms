<template>
  <div class="nav-menu">
    <div class="logo" @click="handleLogoClick">
      <img src="~@/assets/img/logo.svg" alt="logo" />
      <span v-show="!collapse" class="title">{{ appName }}</span>
    </div>
    <el-menu
      :default-active="activePath"
      :unique-opened="false"
      :collapse="collapse"
      v-bind="menuTheme1"
      :style="{ '--active-text-color': menuTheme1['active-text-color'] }"
    >
      <!-- 固定的菜单 -->
      <!-- <el-menu-item index="1" @click="router.push('/main/welcome')">
        <el-icon><Platform /></el-icon>
        <span>Welcome</span>
      </el-menu-item> -->
      <template v-for="item in userMenus" :key="item.wid">
        <!-- 二级菜单 -->
        <template v-if="item.childrens.length > 0">
          <el-sub-menu :index="item.wid">
            <template #title>
              <el-icon>
                <component class="icons" :is="item.icon" />
              </el-icon>
              <span>{{ item.name }}</span>
            </template>
            <el-menu-item
              v-for="subItem in item.childrens"
              :key="subItem.wid"
              :index="subItem.url"
              :style="subItem.icon ? {} : { '--el-menu-level-padding': '30px' }"
              @click="handleMenuItem(subItem)"
            >
              <el-icon v-if="subItem.icon">
                <!-- 动态加载icon -->
                <component class="icons" :is="subItem.icon" />
              </el-icon>
              <span :title="subItem.name" class="ellipsis">
                {{ subItem.name }}
              </span>
            </el-menu-item>
          </el-sub-menu>
        </template>
        <!-- 一级菜单 -->
        <template v-else>
          <el-menu-item :index="item.url" @click="handleMenuItem(item)">
            <el-icon>
              <component class="icons" :is="item.icon" />
            </el-icon>
            <span>{{ item.name }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
  import { computed, defineProps, ref, withDefaults } from "vue";
  import { useRoute } from "vue-router";

  import { useStore } from "@/store";
  import router from "@/router";

  import type { IMenusChildren } from "@/service/types/login";

  interface IProps {
    collapse: boolean;
  }
  withDefaults(defineProps<IProps>(), {
    collapse: false
  });

  const menuTheme1 = {
    // "active-text-color": "#4caf50 ",
    "active-text-color": "var(--el-color-primary)",
    "background-color": "#001529",
    "text-color": "#ccd1d9 "
  };

  // const menuTheme2 = {
  //   "active-text-color": "#ffd700", // 亮金色，用于高亮选中项
  //   "background-color": "#001529", // 深蓝色背景
  //   "text-color": "#aab2bd" // 浅灰蓝色文本
  // };

  const store = useStore();
  const route = useRoute();

  const userMenus = computed(() => store.state.login.userMenus);
  const activePath = ref(route.path);
  const appName = computed(() => process.env.VUE_APP_NAME);

  const handleMenuItem = (item: IMenusChildren) =>
    router.push({ path: item.url ?? "not-found" });

  const handleLogoClick = () => {
    router.push({ path: "/main/welcome" });
    activePath.value = "/main/welcome";
  };
</script>

<style scoped lang="less">
  .nav-menu {
    height: 100%;
    background-color: #001529;
  }

  .logo {
    display: flex;
    height: 28px;
    padding: 12px 10px 8px 10px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    overflow: hidden;

    img {
      height: 100%;
      margin: 0 10px;
    }

    .title {
      font-size: 16px;
      font-weight: 700;
      color: white;
      white-space: nowrap;
    }
  }
  .el-menu {
    border-right: none;
    user-select: none;
  }
  .el-menu-item:hover {
    color: #fff;
    background-color: var(--active-text-color);
  }
  .el-sub-menu {
    .ellipsis {
      max-width: 120px;
    }
    .el-menu-item {
      background-color: #0c2135;
    }
    .el-menu-item:hover {
      color: #fff;
      background-color: var(--active-text-color);
    }
  }
</style>
