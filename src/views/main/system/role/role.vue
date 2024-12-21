<template>
  <div class="role">
    <page-search
      page-name="role"
      @serch-confirm="handleQuery"
      :search-form-config="searchFormConfigRef"
    />
    <page-content ref="pageContentRef" :content-config="contentConfig">
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
  import { searchFormConfig } from "./search.config";
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
</script>

<style scoped lang="less"></style>
