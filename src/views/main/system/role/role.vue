<template>
  <div class="role">
    <page-search
      page-name="role"
      @serch-confirm="handleQuery"
      :search-form-config="searchFormConfigRef"
    />
    <page-content ref="pageContentRef" :content-config="contentConfig">
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
  </div>
</template>

<script setup lang="ts">
  import { computed } from "vue";
  import { usePageContent } from "@/hooks/use-page-content";
  import { useFormOptions } from "@/hooks/use-form-options";

  import PageContent from "@/components/page-content";
  import PageSearch from "@/components/page-search";
  import { searchFormConfig, modules } from "./search.config";
  import { contentConfig, levelNameMap } from "./table.config";
  import { roleLevelMap } from "@/views/main/system/user/table.config";

  const [pageContentRef, handleQuery] = usePageContent();
  const [, departmentOptions, levelOptions] = useFormOptions();

  const searchFormConfigRef = computed(() => {
    const levelItem = searchFormConfig.formItems.find(
      (item) => item.field === "level"
    );
    const departmentItem = searchFormConfig.formItems.find(
      (item) => item.field === "departmentId"
    );

    levelItem!.options = levelOptions;
    departmentItem!.options = departmentOptions;

    return searchFormConfig;
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
