<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>
    <el-tabs type="border-card" stretch v-model="currentTabName">
      <el-tab-pane name="account">
        <template #label>
          <span class="custom-tabs-label">
            <el-icon><UserFilled /></el-icon>
            <span>账号登录</span>
          </span>
        </template>
        <loginAccount ref="accountRef" />
      </el-tab-pane>
      <el-tab-pane name="phone">
        <template #label>
          <span class="custom-tabs-label">
            <el-icon><Iphone /></el-icon>
            <span>手机登录</span>
          </span>
        </template>
        <loginPhone ref="phoneRef" />
      </el-tab-pane>
    </el-tabs>
    <div class="login-opera">
      <el-checkbox v-model="isKeepPassword" label="记住密码" size="large" />
      <el-link type="primary">忘记密码?</el-link>
    </div>
    <el-button type="primary" class="login-btn" @click="handleLogin"
      >登录</el-button
    >
  </div>
</template>

<script setup lang="ts">
  import { ref } from "vue";
  import loginAccount from "./login-account.vue";
  import loginPhone from "./login-phone.vue";

  const isKeepPassword = ref(true);
  const accountRef = ref<InstanceType<typeof loginAccount>>();
  const phoneRef = ref<InstanceType<typeof loginPhone>>();
  const currentTabName = ref("account");

  const handleLogin = () => {
    if (currentTabName.value === "account") {
      accountRef.value?.loginAction(isKeepPassword.value);
    } else {
      phoneRef.value?.phoneLoginAction();
    }
  };
</script>

<style scoped lang="less">
  .login-panel {
    width: 320px;
    .title {
      text-align: center;
    }
    .login-opera {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .login-btn {
      width: 100%;
    }
  }

  /deep/ .custom-tabs-label .el-icon {
    vertical-align: bottom;
    margin-right: 2px;
  }
</style>
