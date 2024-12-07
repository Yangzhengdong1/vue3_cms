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
  export interface IBreadcrumbs {
    name: string;
    path?: string;
  }
  import { defineProps, PropType } from "vue";
  defineProps({
    breadcrumbs: {
      type: Array as PropType<IBreadcrumbs[]>,
      default: () => []
    }
  });
</script>

<style scoped></style>
