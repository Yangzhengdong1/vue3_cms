<template>
  <div class="user">
    <page-search
      page-name="user"
      :search-form-config="searchFormConfigRef"
      @serch-confirm="handleQuery"
      @reset-form="handleReset"
    />
    <page-content
      ref="pageContentRef"
      :content-config="contentConfig"
      @add-new="handleAddData"
      @edit-info="handleEditData"
    >
      <template #roleName="scope">
        <el-tag
          v-if="scope.row.roleName"
          :type="(roleLevelMap as any)[scope.row.level]"
        >
          {{ scope.row.roleName }}
        </el-tag>
      </template>
    </page-content>

    <page-modal
      ref="pageModalRef"
      :modal-form-config="modalFormConfigRef"
      :default-info="defaultInfo"
      page-name="user"
      dialog-title="新增用户"
    />
  </div>
</template>

<script setup lang="ts">
  import { computed } from "vue";
  import { useStore } from "@/store";

  import { usePageContent } from "@/hooks/use-page-content";
  import { usePageModal } from "@/hooks/use-page-modal";

  import PageContent from "@/components/page-content";
  import PageSearch from "@/components/page-search";
  import PageModal from "@/components/page-modal";

  import { searchFormConfig } from "./search.config";
  import { modalFormConfig } from "./modal.config";
  import { contentConfig, roleLevelMap } from "./table.config";

  const store = useStore();

  // 表格相关逻辑
  const [pageContentRef, handleQuery, handleReset] = usePageContent();

  /*
   * tips: 这里必须使用 computed 包裹一下，保持对数据的引用，只有这样才能在 integrityRole/integrityDepartment 发生改变的时候重新刷新组件
   *       如果直接 roleItem!.options = roleOptions; 在当前页面刷新时，可能数据还没从接口请求回来，vuex 中的 integrityRole 还没数据
   *       就会导致菜单列表为空
   */
  // 动态添加筛选表单下拉框与级联选择器的 options
  const searchFormConfigRef = computed(() => {
    const roleItem = searchFormConfig.formItems.find(
      (item) => item.field === "roleId"
    );
    const departmentItem = searchFormConfig.formItems.find(
      (item) => item.field === "departmentId"
    );
    departmentItem!.options = store.state.integrityDepartment.map(
      (item) => item
    );

    roleItem!.options = store.state.integrityRole.map((item) => item);

    return searchFormConfig;
  });

  // 新增/编辑模态框相关逻辑
  const newCallback = () => {
    const passwordItem = modalFormConfigRef.value.formItems.find(
      (item) => item.field === "password"
    );
    passwordItem!.isHidden = false;
  };

  const editCallback = () => {
    const passwordItem = modalFormConfigRef.value.formItems.find(
      (item) => item.field === "password"
    );
    passwordItem!.isHidden = true;
  };
  const modalFormConfigRef = computed(() => {
    const roleItem = modalFormConfig.formItems.find(
      (item) => item.field === "roleId"
    );
    const departmentItem = modalFormConfig.formItems.find(
      (item) => item.field === "departmentId"
    );
    departmentItem!.options = store.state.integrityDepartment.map(
      (item) => item
    );
    roleItem!.options = store.state.integrityRole.map((item) => item);
    return modalFormConfig;
  });

  const [pageModalRef, defaultInfo, handleAddData, handleEditData] =
    usePageModal(newCallback, editCallback);
</script>

<style scoped lang="less">
  /deep/.custom-dialog {
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
