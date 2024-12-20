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
  import { ref, defineExpose, defineProps, watch } from "vue";

  import VForm from "@/components/v-form";
  import { useStore } from "@/store";
  import message from "@/utils/message";

  interface IProps {
    modalFormConfig: any;
    dialogTitle: string;
    defaultInfo: any;
    pageName: string;
  }
  const props = defineProps<IProps>();
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
        params: { ...formData.value, ...(wid && { wid }) }
      });
      dialogVisible.value = result !== "success";
    });
  };

  defineExpose({
    dialogVisible
  });
</script>

<style scoped></style>
