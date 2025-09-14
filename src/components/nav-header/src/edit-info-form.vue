<template>
  <el-form
    :model="formData"
    :rules="rules"
    label-width="80"
    class="user-info-form"
  >
    <el-form-item label="昵称" prop="username">
      <el-input v-model="formData.username"></el-input>
    </el-form-item>
    <el-form-item label="手机号" prop="phone">
      <el-input v-model="formData.phone"></el-input>
    </el-form-item>
    <el-form-item label="真实姓名" prop="realname">
      <el-input v-model="formData.realname" disabled></el-input>
    </el-form-item>
    <el-form-item label="所属部门" prop="departmentName">
      <el-input v-model="formData.departmentName" disabled></el-input>
    </el-form-item>
    <el-form-item label="角色" prop="roleName">
      <el-input v-model="formData.roleName" disabled></el-input>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
  import { IUserInfoResult } from "@/service/types/login";
  import { FormRules } from "element-plus";
  import { defineProps, withDefaults, ref } from "vue";
  const props = withDefaults(
    defineProps<{
      userInfo: Partial<IUserInfoResult>;
    }>(),
    {
      userInfo: () => ({})
    }
  );

  const formData = ref(props.userInfo);

  const rules: FormRules = {
    username: {
      type: "string",
      required: true,
      message: "用户名为必填项"
    },
    phone: {
      type: "string",
      required: true,
      message: "手机号为必填项"
    }
  };
</script>

<style lang="less" scoped>
  .user-info-form {
    padding: 12px 16px;
    background: #fff;
    /deep/ .el-input {
      height: 40px;
      color: #1d2129;
      border-radius: 9px;
      .el-input__inner {
        transition: all 0.2s ease;

        &::placeholder {
          color: #c9cdd4;
        }
        &:disabled {
          background-color: #f5f7fa;
          color: #86909c;
        }
      }
      &:hover {
        box-shadow: 0 0 0 2px rgba(64, 128, 255, 0.15) !important;
        color: #4080ff;
      }
      .el-input__wrapper {
        border-radius: 9px;
      }
      .is-focus {
        border-color: #4080ff !important;
      }
    }
    /deep/ .is-disabled {
      &:hover {
        box-shadow: 0 0 0 0px transparent !important;
      }
    }
    /deep/.el-form-item__label {
      color: #4e5969;
      .el-form-item__required {
        color: #f53f3f;
      }
    }
    /deep/.el-form-item__content {
      line-height: 1.4;
    }
    /deep/.el-form-item.is-error {
      .el-input {
        &:hover {
          box-shadow: 0 0 0 2px rgba(245, 63, 63, 0.08) !important;
        }
      }
      .el-input__inner {
        border-color: #f53f3f;
      }

      .el-form-item__error {
        color: #f53f3f;
      }
    }
  }
</style>
