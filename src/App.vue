<template>
  <div class="app">
    <router-view />
    <theme-switch />
  </div>
</template>

<script lang="ts" setup>
  import ThemeSwitch from "@/components/theme-switcher";
</script>

<style lang="less">
  @import url("@/assets/css/index");
  .app {
    height: 100%;
  }
</style>
