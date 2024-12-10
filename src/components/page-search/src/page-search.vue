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
          <el-button :icon="Search" class="confirm-button" type="primary">
            确认
          </el-button>
        </div>
      </template>
    </v-form>
  </div>
</template>

<script setup lang="ts">
  import { ref, defineProps } from "vue";
  import { Refresh, Search } from "@element-plus/icons-vue";
  import VForm from "@/components/v-form";

  interface IProps {
    searchFormConfig: object;
  }

  defineProps<IProps>();

  const formData = ref({
    name: "",
    password: "",
    status: false,
    dateTime: ""
  });

  const handleRefreshForm = () => {
    console.log(formData.value);
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
