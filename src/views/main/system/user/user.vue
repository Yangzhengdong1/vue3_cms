<template>
  <div class="user">
    <page-search
      :search-form-config="searchFormConfig"
      @serch-confirm="handleQuery"
      @reset-form="handleReset"
    />
    <page-content ref="pageContentRef" :content-config="contentConfig">
      <template #roleName="scope">
        <el-tag
          v-if="scope.row.roleName"
          :type="(roleLevelMap as any)[scope.row.level]"
        >
          {{ scope.row.roleName }}
        </el-tag>
      </template>
    </page-content>
  </div>
</template>

<script setup lang="ts">
  import PageContent from "@/components/page-content";
  import PageSearch from "@/components/page-search";
  import { searchFormConfig } from "./search.config";
  import { contentConfig, roleLevelMap } from "./table.config";

  import { usePageContent } from "@/hooks/use-page-content";
  const [pageContentRef, handleQuery, handleReset] = usePageContent();
</script>

<style scoped lang="less"></style>
