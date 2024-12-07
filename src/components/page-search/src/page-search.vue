<template>
  <div class="page-search">
    <v-form
      v-bind="searchFormConfig"
      v-model="formData"
      @update:model-value="handleUpdateModel"
    >
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

  defineProps({
    searchFormConfig: {
      type: Object,
      required: true
    }
  });
  const formData = ref({
    name: "",
    password: "",
    status: false,
    dateTime: ""
  });

  // 显式监听 v-model update 事件，并将传递的值赋值给 formData
  const handleUpdateModel = (value: any) => (formData.value = { ...value });

  const handleRefreshForm = () => {
    // 不显式监听 update 事件，这里拿不到值
    console.log(formData.value);
  };
</script>

<style scoped lang="less">
  .search-buttons {
    display: flex;
    justify-content: flex-end;
    gap: 12px; /* 按钮之间的间距 */
    margin-top: 16px; /* 与搜索区域的其他内容保持间距 */
    padding: 10px 40px;
    .reset-button {
      background-color: #f4f4f5; /* 浅灰色背景 */
      color: #606266; /* 深灰色字体 */
      border: 1px solid #dcdfe6; /* 边框颜色 */
      border-radius: 4px; /* 圆角设计 */
      transition: all 0.3s; /* 动画过渡 */
    }

    .reset-button:hover {
      background-color: #e6e6e6; /* 鼠标悬停时稍微变深 */
      border-color: #c0c4cc;
      color: #303133;
    }

    .confirm-button {
      background-color: #409eff; /* 主题蓝色 */
      color: #fff; /* 白色字体 */
      border-radius: 4px;
      transition: all 0.3s;
    }

    .confirm-button:hover {
      background-color: #66b1ff; /* 悬停时更亮一些 */
    }

    .confirm-button:disabled {
      background-color: #c0c4cc; /* 禁用状态为灰色 */
      color: #ffffff;
    }
  }
</style>
