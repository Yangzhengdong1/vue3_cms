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
      :dialog-title="defaultInfo.wid ? '编辑用户' : '新增用户'"
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

<style scoped lang="less"></style>
