<template>
  <div class="role">
    <page-search :search-form-config="searchFormConfig" />
    <page-content :content-config="contentConfig">
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
  import PageContent from "@/components/page-content";
  import PageSearch from "@/components/page-search";
  import { searchFormConfig } from "./search.config";
  import { contentConfig, levelNameMap } from "./table.config";
  import { roleLevelMap } from "@/views/main/system/user/table.config";
</script>

<style scoped lang="less"></style>
