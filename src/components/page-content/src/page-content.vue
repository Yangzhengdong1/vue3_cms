<template>
  <div class="page-content">
    <v-table
      :table-data="userList"
      :data-count="total"
      :prop-list="contentConfig.propList"
      v-bind="contentConfig.childrenProps"
      v-model:page="pageInfo"
    >
      <template #isActive="scope">
        <el-switch
          v-model="scope.row.isActive"
          style="
            --el-switch-on-color: var(--el-color-primary);
            --el-switch-off-color: var(--el-color-danger);
          "
          :active-action-icon="View"
          :inactive-action-icon="Hide"
        />
      </template>
      <template #roleName="scope">
        <el-tag
          v-if="scope.row.roleName && roleLevelMap"
          :type="(roleLevelMap as any)[scope.row.level]"
        >
          {{ scope.row.roleName }}
        </el-tag>
      </template>
      <template #handler>
        <el-button type="primary" :icon="Edit" link>编辑</el-button>
        <el-button type="danger" :icon="Delete" link>删除</el-button>
      </template>
    </v-table>
  </div>
</template>

<script setup lang="ts">
  import { defineProps, computed, ref, watch, defineExpose } from "vue";
  import { Hide, View, Edit, Delete } from "@element-plus/icons-vue";
  import VTable from "@/components/v-table";

  import { useStore } from "@/store/index";

  import type { IProps } from "./types";

  const props = defineProps<IProps>();
  const store = useStore();

  const pageInfo = ref({
    currentPage: 1,
    pageSize: 10
  });

  watch(
    pageInfo,
    () => {
      fetchPageList();
    },
    { deep: true }
  );

  // 发请求
  const fetchPageList = (queryInfo?: any) => {
    store.dispatch("system/getPageListAction", {
      pageName: props.contentConfig.pageName,
      queryInfo: {
        pageNum: pageInfo.value.currentPage,
        pageSize: pageInfo.value.pageSize,
        ...queryInfo
      }
    });
  };

  fetchPageList();

  // 从 Vuex 获取数据
  const userList = computed(() =>
    store.getters["system/getDataList"](props.contentConfig.pageName)
  );
  const total = computed(() =>
    store.getters["system/getDataCount"](props.contentConfig.pageName)
  );

  defineExpose({
    fetchPageList
  });
</script>

<style scoped lang="less"></style>
