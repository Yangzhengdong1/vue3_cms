<template>
  <div class="page-content"></div>
</template>

<script setup lang="ts">
  import { defineProps } from "vue";

  interface IProps {
    contentConfig: {
      pageName: string;
      propsList: any[];
      childrenProps?: any;
    };
  }
  const props = defineProps<IProps>();
</script>

<style scoped lang="less"></style>
