<template>
  <div class="menu">
    <page-content
      :content-config="contentConfig"
      @add-new="handleAddData"
      @edit-info="handleEditData"
    >
      <template #icon="scope">
        <el-icon v-if="scope.row.icon">
          <component :is="scope.row.icon"></component>
        </el-icon>
      </template>
    </page-content>
    <page-modal
      ref="pageModalRef"
      page-name="menu"
      :modal-form-config="modalFormConfigRef"
      :default-info="defaultInfo"
      :dialog-title="defaultInfo.wid ? '编辑菜单' : '新增菜单'"
    />
  </div>
</template>

<script setup lang="ts">
  import { useStore } from "@/store";

  import PageContent from "@/components/page-content";
  import PageModal from "@/components/page-modal";
  import { contentConfig } from "./table.config";
  import { modalFormConfig } from "./modal.config";
  import { usePageModal } from "@/hooks/use-page-modal";
  import { computed } from "vue";

  const store = useStore();
  const modalFormConfigRef = computed(() => {
    const parentIdItem = modalFormConfig.formItems.find(
      (item: any) => item.field === "parentId"
    );
    parentIdItem!.options = store.state.integrityMenu;
    return modalFormConfig;
  });

  const [pageModalRef, defaultInfo, handleAddData, handleEditData] =
    usePageModal();
</script>

<style scoped lang="less">
  /deep/ .el-table__row--level-1 {
    .el-table__expand-icon {
      margin-left: 45px;
    }
  }

  /deep/ .el-table__row--level-2 {
    .el-tooltip {
      padding-left: 45px;
    }
  }
</style>
