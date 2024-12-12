<template>
  <div class="page-content">
    <v-table
      :table-data="list"
      :data-count="total"
      :prop-list="contentConfig.propList"
      :tableProps="contentConfig.tableProps"
      v-bind="contentConfig.otherComponentProps"
      v-model:page="pageInfo"
    >
      <template #table-header>
        <el-button
          v-cms-permit-directive="[
            {
              event: 'click',
              directive: `${contentConfig.pageName}_create`,
              handler: () => handleAdd()
            }
          ]"
          :icon="CirclePlus"
          class="confirm-button"
          type="primary"
        >
          新增
        </el-button>
      </template>
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
      <template #status="scope">
        <el-switch
          v-model="scope.row.status"
          style="
            --el-switch-on-color: var(--el-color-primary);
            --el-switch-off-color: var(--el-color-danger);
          "
          :active-action-icon="View"
          :inactive-action-icon="Hide"
        />
      </template>

      <template #handler="scope">
        <el-button
          v-cms-permit-directive="[
            {
              event: 'click',
              directive: `${contentConfig.pageName}_update`,
              handler: () => handleEdit(scope.row)
            }
          ]"
          type="primary"
          :icon="Edit"
          link
          >编辑</el-button
        >
        <el-button
          v-cms-permit-directive="[
            {
              event: 'click',
              directive: `${contentConfig.pageName}_delete`,
              handler: () => handleDelete(scope.row)
            }
          ]"
          type="danger"
          :icon="Delete"
          link
          >删除</el-button
        >
      </template>

      <!-- 动态注册插槽 -->
      <template
        v-for="item in otherSlotNames ?? []"
        :key="item.slotName"
        #[item.slotName]="scope"
      >
        <slot :name="item.slotName" :row="scope.row"></slot>
      </template>
    </v-table>
  </div>
</template>

<script setup lang="ts">
  import { defineProps, computed, ref, watch, defineExpose } from "vue";
  import {
    Hide,
    View,
    Edit,
    Delete,
    CirclePlus
  } from "@element-plus/icons-vue";
  import VTable from "@/components/v-table";

  import { useStore } from "@/store/index";
  import { usePremission } from "@/hooks/use-premission";

  import type { IProps } from "./types";

  const props = defineProps<IProps>();
  const store = useStore();

  // 判断权限的另一种方式
  const isCreate = usePremission(props.contentConfig.pageName, "create");
  const isDelete = usePremission(props.contentConfig.pageName, "delete");
  const isUpdate = usePremission(props.contentConfig.pageName, "update");
  const isQuery = usePremission(props.contentConfig.pageName, "query");

  const pageInfo = ref({
    currentPage: 1,
    pageSize: 10,
    pageName: "user"
  });

  watch(
    pageInfo,
    () => {
      fetchPageList();
    },
    { deep: true }
  );

  // 发送请求
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
  const list = computed(() =>
    store.getters["system/getDataList"](props.contentConfig.pageName)
  );
  const total = computed(() =>
    store.getters["system/getDataCount"](props.contentConfig.pageName)
  );

  // 获取其他动态插槽
  const fixedSlotNames = ["status", "isActive", "handler"];
  const otherSlotNames: { slotName: string }[] =
    props.contentConfig.propList.filter((item) => {
      return item.slotName && !fixedSlotNames.includes(item?.slotName);
    });

  // 操作
  const handleAdd = () => {
    console.log("add");
  };
  const handleEdit = (item: any) => {
    console.log(item, "edit");
  };
  const handleDelete = (item: any) => {
    console.log(item, "delete");
  };
  defineExpose({
    fetchPageList
  });
</script>

<style scoped lang="less"></style>
