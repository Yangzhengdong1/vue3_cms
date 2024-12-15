<template>
  <div class="page-search">
    <v-form
      v-bind="searchFormConfig"
      v-model="formData"
      @update:modelValue="handleValueChange"
    >
      <template #footer>
        <div class="search-buttons">
          <el-button
            :icon="Refresh"
            class="reset-button"
            @click="handleResetForm"
          >
            重置
          </el-button>
          <el-button
            :icon="Search"
            class="confirm-button"
            type="primary"
            @click="handleSerchConfirm"
          >
            确认
          </el-button>
        </div>
      </template>
    </v-form>
  </div>
</template>

<script setup lang="ts">
  import { ref, defineProps, defineEmits, defineExpose } from "vue";
  import { Refresh, Search } from "@element-plus/icons-vue";
  import VForm from "@/components/v-form";
  import type { IForm } from "@/components/v-form";
  import { useStore } from "@/store";

  const emit = defineEmits(["resetForm", "serchConfirm"]);

  interface IProps {
    searchFormConfig: IForm;
  }
  const props = defineProps<IProps>();
  const store = useStore();

  // 动态获取表单字段
  const originalFormData: any = {};
  props.searchFormConfig.formItems.forEach(
    (item) => (originalFormData[item.field] = item.defaultValue)
  );
  const formData = ref(originalFormData);
  store.commit("system/changeQueryInfo", formData.value);

  const handleResetForm = () => {
    formData.value = originalFormData;
    const [startTime = "", endTime = ""] = formData.value.dateTime ?? [];
    const queryInfo = { ...formData.value, startTime, endTime } as any;
    delete queryInfo.dateTime;
    store.commit("system/changeQueryInfo", formData.value);

    emit("resetForm", queryInfo);
  };

  const handleSerchConfirm = () => {
    const [startTime = "", endTime = ""] = formData.value.dateTime ?? [];
    const queryInfo = { ...formData.value, startTime, endTime } as any;
    delete queryInfo.dateTime;
    emit("serchConfirm", queryInfo);
  };

  // 查询参数发生变化时，同步到 veux 中
  const handleValueChange = (value: any) => {
    store.commit("system/changeQueryInfo", value);
  };

  defineExpose({
    formData
  });
</script>

<style scoped lang="less">
  /deep/.el-form-item {
    margin-bottom: 16px;
  }
  .search-buttons {
    display: flex;
    justify-content: flex-end;
    gap: 12px; /* 按钮之间的间距 */
    margin-top: 16px; /* 与搜索区域的其他内容保持间距 */
    padding: 10px 30px;
  }
</style>
