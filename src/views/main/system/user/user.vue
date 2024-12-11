<template>
  <div class="user">
    <page-search
      :search-form-config="searchFormConfig"
      @serch-confirm="handleQuery"
      @refresh-form="handleRefresh"
    />
    <page-content
      ref="pageContentRef"
      :content-config="contentConfig"
      :role-level-map="roleLevelMap"
    />
  </div>
</template>

<script setup lang="ts">
  import PageContent from "@/components/page-content";
  import PageSearch from "@/components/page-search";
  import { searchFormConfig } from "./form.config";
  import { contentConfig, roleLevelMap } from "./table.config";

  import { usePageContent } from "@/hooks/use-page-content";

  const [pageContentRef, handleQuery, handleRefresh] = usePageContent();
</script>

<style scoped lang="less"></style>
