<template>
  <div class="goods">
    <page-search
      :searchFormConfig="searchFormConfig"
      @serch-confirm="handleQuery"
    />
    <page-content :contentConfig="contentConfig" ref="pageContentRef">
      <template #imgUrl="scope">
        <el-image
          style="width: 80px; height: 80px"
          :src="scope.row.img_url"
          :zoom-rate="1.2"
          :max-scale="7"
          :min-scale="0.2"
          :preview-src-list="[scope.row.img_url]"
          :initial-index="9999"
          :z-index="9999"
          preview-teleported
          fit="cover"
        />
      </template>
      <template #price="scope"> ￥{{ scope.row.price }} </template>
    </page-content>
  </div>
</template>

<script setup lang="ts">
  import PageSearch from "@/components/page-search";
  import PageContent from "@/components/page-content";
  import { searchFormConfig } from "./search.config";
  import { contentConfig } from "./table.config";

  import { usePageContent } from "@/hooks/use-page-content";

  const [pageContentRef, handleQuery] = usePageContent();
</script>

<style scoped lang="less"></style>
