<template>
  <div class="role">
    <page-search
      page-name="role"
      @serch-confirm="handleQuery"
      :search-form-config="searchFormConfigRef"
    />
    <page-content
      ref="pageContentRef"
      :content-config="contentConfig"
      @add-new="handleAddData"
      @edit-info="handleEditData"
    >
      <template #expand="scope">
        <div class="permission-box">
          <template v-for="item in modules" :key="item.id">
            <div>
              <span>{{ item.name }}模块：</span>
              <span>{{
                filterRolePermission(scope.row.permissions, item.id)
                  ? filterRolePermission(scope.row.permissions, item.id)
                  : "暂无权限~"
              }}</span>
            </div>
          </template>
        </div>
      </template>
      <template #level="scope">
        <el-tag
          v-if="scope.row.level"
          :type="(roleLevelMap as any)[scope.row.level]"
        >
          {{ levelNameMap[scope.row.level] }}
        </el-tag>
      </template>
    </page-content>
    <page-modal
      ref="pageModalRef"
      page-name="role"
      :modal-form-config="modalFormConfigRef"
      :default-info="defaultInfo"
      :dialog-title="defaultInfo.wid ? '编辑角色' : '新增角色'"
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

  import { searchFormConfig, modules } from "./search.config";
  import { contentConfig, levelNameMap } from "./table.config";
  import { roleLevelMap } from "@/views/main/system/user/table.config";
  import { modalFormConfig } from "./modal.config";

  const [pageContentRef, handleQuery] = usePageContent();
  const [pageModalRef, defaultInfo, handleAddData, handleEditData] =
    usePageModal();
  const store = useStore();

  // 动态添加筛选表单options
  const searchFormConfigRef = computed(() => {
    const levelItem = searchFormConfig.formItems.find(
      (item) => item.field === "level"
    );
    const departmentItem = searchFormConfig.formItems.find(
      (item) => item.field === "departmentId"
    );

    levelItem!.options = store.state.integrityLevel;
    departmentItem!.options = store.state.integrityDepartment;

    return searchFormConfig;
  });

  // 动态添加新增/编辑表单options
  const modalFormConfigRef = computed(() => {
    const levelItem = modalFormConfig.formItems.find(
      (item) => item.field === "level"
    );
    const departmentItem = modalFormConfig.formItems.find(
      (item) => item.field === "departmentId"
    );
    const permissionItem = modalFormConfig.formItems.find(
      (item) => item.field === "permissions"
    );

    levelItem!.options = store.state.integrityLevel;
    departmentItem!.options = store.state.integrityDepartment;
    permissionItem!.options = store.state.integrityPermission;

    return modalFormConfig;
  });

  // 处理角色权限展示
  const filterRolePermission = (permissions: any[], moduleName = "user") => {
    const permissionArr = permissions.map((permission: any) => {
      permission.groupName = permission.name.split("_")[0];
      return permission;
    });
    const permissionNames: string[] = [];
    permissionArr.forEach(
      (item) => item.groupName === moduleName && permissionNames.push(item.name)
    );

    return permissionNames.join("、");
  };
</script>

<style scoped lang="less">
  .permission-box {
    > div {
      padding: 15px;
    }
  }
</style>
