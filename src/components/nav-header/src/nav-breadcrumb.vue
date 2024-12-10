<template>
  <div class="nav-breadcrumb">
    <el-breadcrumb separator="/">
      <template v-for="item in breadcrumbs" :key="item.name">
        <el-breadcrumb-item :to="{ path: item.path }">{{
          item.name
        }}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
  import { defineProps } from "vue";

  export interface IBreadcrumbs {
    name: string;
    path?: string;
  }
  interface IProps {
    breadcrumbs: IBreadcrumbs[];
  }

  // 方式一：
  defineProps<IProps>();

  // 方式二：
  // defineProps({
  //   breadcrumbs: {
  //     type: Array as PropType<IBreadcrumbs[]>,
  //     default: () => []
  //   }
  // });
</script>

<style scoped></style>
