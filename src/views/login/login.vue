<template>
  <div class="login">
    <loginPane />
  </div>
</template>

<script setup lang="ts">
  import loginPane from "./children/login-panel.vue";
</script>

<style lang="less" scoped>
  .login {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    background-image: url("@/assets/img/login-bg.svg");
  }
</style>
