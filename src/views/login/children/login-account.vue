<template>
  <div class="login-phone">
    <el-form label-width="80px" :rules="rules" :model="account" ref="fromRef">
      <el-form-item label="昵称" prop="username">
        <el-input
          v-model="account.username"
          @keydown.enter="pwdInput?.focus()"
        />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          ref="pwdInput"
          v-model="account.password"
          show-password
          @keydown.enter="loginAction"
        />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
  import { reactive, defineExpose, ref } from "vue";
  import { useStore } from "vuex";
  import { ElForm } from "element-plus";

  import { accountRules as rules } from "../config";
  import localCache from "@/utils/local-cache";
  import crypto from "@/utils/crypto";

  const decryptedPwd = crypto.decrypt(
    localCache.getCache("password", "local") ?? ""
  );

  const store = useStore();

  const account = reactive({
    username: localCache.getCache("username", "local") ?? "",
    password: decryptedPwd ?? ""
  });

  const fromRef = ref<InstanceType<typeof ElForm>>();
  const pwdInput = ref<HTMLInputElement>();

  const loginAction = (isKeepPassword: boolean) => {
    fromRef.value?.validate((valid) => {
      if (!valid) {
        return;
      }
      const encryptedPwd = crypto.encrypt(account.password);

      // 判断是否勾选记住密码
      if (isKeepPassword) {
        localCache.setCache("username", account.username, "local");
        localCache.setCache("password", encryptedPwd, "local");
      } else {
        localCache.removeCache("username", "local");
        localCache.removeCache("password", "local");
      }

      store.dispatch("login/accountLoginAction", {
        username: account.username,
        password: encryptedPwd
      });
    });
  };

  // 使用 setup 语法糖时，组件是默认关闭的，无法通过 ref 获取组件实例内部的方法和属性；
  // 需要通过 defineExpose 函数暴露出去；
  defineExpose({
    loginAction
  });
</script>

<style scoped lang="less"></style>
