<template>
  <div class="permission">
    <page-search
      :page-name="pageName"
      :search-form-config="searchFormConfig"
      @serch-confirm="handleQuery"
    />
    <page-content
      ref="pageContentRef"
      :content-config="contentConfig"
      @add-new="handleAddData"
      @edit-info="handleEditData"
    />
    <page-modal
      ref="pageModalRef"
      :page-name="pageName"
      :default-info="defaultInfo"
      :dialog-title="defaultInfo.wid ? '编辑权限' : '新增权限'"
      :modal-form-config="modalFormConfig"
    />
  </div>
</template>

<script setup lang="ts">
  import PageContent from "@/components/page-content";
  import PageSearch from "@/components/page-search";
  import PageModal from "@/components/page-modal";

  import { searchFormConfig } from "./search.config";
  import { contentConfig } from "./table.config";
  import { modalFormConfig } from "./modal.config";

  import { usePageContent } from "@/hooks/use-page-content";
  import { usePageModal } from "@/hooks/use-page-modal";

  const pageName = "permission";
  const [pageContentRef, handleQuery] = usePageContent();
  const newCallback = () => {
    const nameItem = modalFormConfig.formItems.find(
      (item) => item.field === "name"
    );
    nameItem!.otherOptions.disabled = false;
  };
  const editCallback = () => {
    const nameItem = modalFormConfig.formItems.find(
      (item) => item.field === "name"
    );
    nameItem!.otherOptions.disabled = true;
  };
  const [pageModalRef, defaultInfo, handleAddData, handleEditData] =
    usePageModal(newCallback, editCallback);
</script>

<style scoped lang="less"></style>
