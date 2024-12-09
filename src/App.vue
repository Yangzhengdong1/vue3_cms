<template>
  <div class="app">
    <el-config-provider :locale="zhCn">
      <router-view />
      <theme-switch />
    </el-config-provider>
  </div>
</template>

<script lang="ts" setup>
  import ThemeSwitch from "@/components/theme-switcher";
  import { ElConfigProvider } from "element-plus";
  import zhCn from "element-plus/es/locale/lang/zh-cn";
</script>

<style lang="less">
  @import url("@/assets/css/index");
  .app {
    height: 100%;
  }
</style>
