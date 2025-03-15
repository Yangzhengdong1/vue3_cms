<template>
  <div class="v-card">
    <el-card>
      <template #header>
        <slot name="title"> {{ title }} </slot>
      </template>
      <div class="card-content">
        <slot></slot>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
  import { defineProps, withDefaults } from "vue";

  interface IProps {
    title: string;
  }
  withDefaults(defineProps<IProps>(), {
    title: "Title"
  });
</script>

<style lang="scss" scoped></style>
