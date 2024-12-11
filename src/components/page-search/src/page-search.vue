<template>
  <div class="page-search">
    <v-form v-bind="searchFormConfig" v-model="formData">
      <template #footer>
        <div class="search-buttons">
          <el-button
            :icon="Refresh"
            class="reset-button"
            @click="handleRefreshForm"
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
  import { ref, defineProps, defineEmits } from "vue";
  import { Refresh, Search } from "@element-plus/icons-vue";
  import VForm from "@/components/v-form";
  import type { IForm } from "@/components/v-form";

  const emit = defineEmits(["refreshForm", "serchConfirm"]);

  interface IProps {
    searchFormConfig: IForm;
  }
  const props = defineProps<IProps>();

  // 动态获取表单字段
  const originalFormData: any = {};
  props.searchFormConfig.formItems.forEach(
    (item) => (originalFormData[item.field] = item.defaultValue)
  );
  const formData = ref(originalFormData);

  const handleRefreshForm = () => {
    formData.value = originalFormData;
    const [startTime = "", endTime = ""] = formData.value.dateTime ?? [];
    const queryInfo = { ...formData.value, startTime, endTime } as any;
    delete queryInfo.dateTime;
    emit("refreshForm", queryInfo);
  };

  const handleSerchConfirm = () => {
    const [startTime = "", endTime = ""] = formData.value.dateTime ?? [];
    const queryInfo = { ...formData.value, startTime, endTime } as any;
    delete queryInfo.dateTime;
    emit("serchConfirm", queryInfo);
  };
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
