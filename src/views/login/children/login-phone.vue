<template>
  <div class="login-phone">
    <el-form label-width="80px" :rules="rules" :model="phone" ref="fromRef">
      <el-form-item label="手机号" prop="num">
        <el-input v-model="phone.num" />
      </el-form-item>
      <el-form-item label="验证码" prop="code">
        <div class="get-code">
          <el-input v-model="phone.code" />
          <el-button
            type="primary"
            :disabled="isBtnDisabled"
            class="login-btn"
            @click="handleGetCode"
            >{{ codeText }}</el-button
          >
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
  import { onBeforeUnmount, reactive, ref, defineExpose } from "vue";
  import { ElForm, ElMessage } from "element-plus";

  import { phoneRules as rules } from "../config";

  const phone = reactive({
    num: "",
    code: ""
  });
  const codeText = ref("获取验证码");
  const isBtnDisabled = ref(false);
  const fromRef = ref<InstanceType<typeof ElForm>>();

  let timer: number | undefined = undefined;
  const handleGetCode = () => {
    if (!rules.num[1].pattern?.test(phone.num)) {
      ElMessage.error("请输入合法的手机号~");
      return;
    }
    timer && clearInterval(timer);

    let stratNum = 60;
    isBtnDisabled.value = true;
    codeText.value = `${stratNum - 1}s`;

    timer = setInterval(() => {
      if (stratNum - 1 > 1) {
        stratNum = stratNum - 1;
        codeText.value = `${stratNum - 1}s`;
      } else {
        codeText.value = `获取验证码`;
        isBtnDisabled.value = false;
      }
    }, 1000);
  };

  const phoneLoginAction = () => {
    fromRef.value?.validate((valid) => {
      if (!valid) {
        return;
      }
      console.log("phone login");
    });
  };

  onBeforeUnmount(() => {
    console.log("onBeforeUnmount");
    clearInterval(timer);
  });

  defineExpose({
    phoneLoginAction
  });
</script>

<style scoped lang="less">
  .get-code {
    display: flex;
    /deep/.el-button {
      margin-left: 10px;
      min-width: 100px;

      > span {
        display: flex;
        justify-content: center !important;
        align-items: center;
        width: 100%;
      }
    }
  }
</style>
