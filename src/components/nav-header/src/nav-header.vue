<template>
  <div class="nav-header">
    <div class="left">
      <el-icon class="fold-class" @click="handleFold"
        ><component :is="iconName"
      /></el-icon>
    </div>

    <div class="right">
      <div class="">
        <nav-breadcrumb :breadcrumbs="breadcrumbs" />
      </div>
      <user-info />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed, defineEmits } from "vue";
  import { useRoute } from "vue-router";
  import { useStore } from "vuex";

  import UserInfo from "./user-info.vue";
  import NavBreadcrumb from "./nav-breadcrumb.vue";

  import { pathMapBreadcrumbs } from "@/utils/map-menus";

  const emits = defineEmits(["changeFold"]);

  const isFold = ref(false);
  const iconName = computed(() => (isFold.value ? "Fold" : "Expand"));
  const handleFold = () => {
    isFold.value = !isFold.value;
    emits("changeFold", isFold.value);
  };

  // 面包屑
  const route = useRoute();
  const store = useStore();
  const breadcrumbs = computed(() => {
    return pathMapBreadcrumbs(store.state.login.userMenus, route.path);
  });
</script>

<style scoped lang="less">
  .nav-header {
    display: flex;
    align-items: center;
    width: 100%;
    .right {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-left: 10px;
      font-size: 14px;
    }
    .fold-class {
      font-size: 20px;
      cursor: pointer;
    }
  }
</style>
