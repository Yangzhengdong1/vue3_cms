<template>
  <div class="user">
    <page-search :search-form-config="searchFormConfig" />
  </div>
</template>

<script setup lang="ts">
  import PageSearch from "@/components/page-search";
  import { searchFormConfig } from "./form.config";

  import { useStore } from "vuex";
  const store = useStore();

  store.dispatch("system/getPageListAction", {
    url: "/user/get-list",
    queryInfo: { pageSize: 1, pageNum: 1 }
  });
</script>

<style scoped lang="less"></style>
