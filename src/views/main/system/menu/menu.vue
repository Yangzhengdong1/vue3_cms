<template>
  <div class="menu">
    <page-content :content-config="contentConfig">
      <template #icon="scope">
        <el-icon v-if="scope.row.icon">
          <component :is="scope.row.icon"></component>
        </el-icon>
      </template>
    </page-content>
  </div>
</template>

<script setup lang="ts">
  import PageContent from "@/components/page-content";
  import { contentConfig } from "./table.config";
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
