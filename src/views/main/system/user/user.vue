<template>
  <div class="user">
    <page-search :search-form-config="searchFormConfig" />
    <page-content
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
</script>

<style scoped lang="less"></style>
