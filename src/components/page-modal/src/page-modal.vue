<template>
  <div class="page-modal">
    <el-dialog
      v-model="dialogVisible"
      :title="dialogTitle"
      width="500px"
      :modal="true"
      :close-on-click-modal="false"
      class="custom-dialog"
      align-center
      destroy-on-close
      center
    >
      <div class="dialog-content">
        <v-form
          ref="vFormRef"
          v-model="formData"
          v-bind="modalFormConfig"
        ></v-form>
        <slot></slot>
      </div>

      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirmClick">
            确定
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
  import { ref, defineExpose, defineProps, watch, withDefaults } from "vue";

  import VForm from "@/components/v-form";
  import { useStore } from "@/store";
  import message from "@/utils/message";

  interface IProps {
    modalFormConfig: any;
    dialogTitle: string;
    defaultInfo: any;
    pageName: string;
    otherInfo?: any;
  }
  const props = withDefaults(defineProps<IProps>(), {
    otherInfo: () => ({})
  });
  const formData = ref<any>({});

  watch(
    () => props.defaultInfo,
    (newValue) => {
      props.modalFormConfig.formItems.forEach((item: any) => {
        formData.value[item.field] = newValue[item.field] ?? "";
      });
    }
  );
  const dialogVisible = ref(false);

  const store = useStore();
  const vFormRef = ref<InstanceType<typeof VForm>>();
  const handleConfirmClick = async () => {
    // 验证表单状态
    vFormRef.value?.formRef?.validate(async (valid: boolean) => {
      if (!valid) {
        message.warning("请按提示要求填写内容");
        return;
      }

      // 创建 or 编辑
      const actionName = !Object.keys(props.defaultInfo).length
        ? "system/createPageDataAction"
        : "system/editPageDataAction";
      const wid = !Object.keys(props.defaultInfo).length
        ? null
        : props.defaultInfo.wid;

      const result = await store.dispatch(actionName, {
        pageName: props.pageName,
        params: { ...formData.value, ...(wid && { wid }), ...props.otherInfo }
      });
      dialogVisible.value = result !== "success";
    });
  };

  defineExpose({
    dialogVisible
  });
</script>

<style scoped lang="less">
  ::v-deep .custom-dialog {
    /* 设置整体样式 */
    .el-dialog {
      border-radius: 8px; /* 圆角 */
      box-shadow: 0 10px 30px var(--v-box-shadow-color-15); /* 柔和阴影 */
      border: 1px solid var(--el-border-color-light); /* 边框颜色 */
    }

    /* 标题样式 */
    .el-dialog__header {
      font-size: 18px;
      font-weight: 600; /* 加粗标题 */
      color: var(--el-text-color-primary); /* 标题颜色 */
      text-align: center; /* 居中对齐 */
      padding: 12px 16px;
      border-bottom: 1px solid var(--el-border-color-light); /* 底部分割线 */
    }

    /* 内容样式 */
    .dialog-content {
      max-height: 450px;
      overflow: auto;
      font-size: 14px;
      color: var(--el-text-color-secondary); /* 默认文本颜色 */
      line-height: 1.5;
    }

    /* 底部按钮区域 */
    .dialog-footer {
      display: flex;
      justify-content: flex-end; /* 按钮靠右对齐 */
      padding: 15px 16px;
    }

    /* 按钮样式 */
    .dialog-footer .el-button {
      margin-left: 10px;
    }

    /* 关闭按钮 */
    .el-dialog__close {
      color: #909399; /* 默认颜色 */
      font-size: 16px;
      top: 10px; /* 调整位置 */
      right: 10px;
      &:hover {
        color: var(--el-color-danger); /* 悬停颜色 */
      }
    }
  }
</style>
