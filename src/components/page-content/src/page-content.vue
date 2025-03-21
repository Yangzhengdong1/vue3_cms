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
              directive: `${contentConfig.pageName}_query`,
              handler: () => handleTableRefresh()
            }
          ]"
          :icon="Refresh"
          v-if="contentConfig.otherComponentProps.refreshBtn ?? true"
          >刷新</el-button
        >
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
      <template #expand="scope">
        <slot name="expand" :row="scope.row"></slot>
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
          @change="handleSwitchChange(scope.row)"
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
          @change="handleSwitchChange(scope.row)"
        />
      </template>

      <template #handler="scope">
        <el-button
          v-if="isUpdate"
          @click="handleEdit(scope.row)"
          type="primary"
          :icon="Edit"
          link
          >编辑</el-button
        >
        <el-button
          v-if="isDelete"
          @click="handleDelete(scope.row)"
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
  import {
    defineProps,
    computed,
    ref,
    watch,
    defineExpose,
    defineEmits
  } from "vue";
  import {
    Hide,
    View,
    Edit,
    Delete,
    CirclePlus,
    Refresh
  } from "@element-plus/icons-vue";
  import VTable from "@/components/v-table";

  import { useStore } from "@/store/index";
  import { usePremission } from "@/hooks/use-premission";
  import { confirmDialog, IType } from "@/utils/message-box";

  import type { IProps } from "./types";

  const emit = defineEmits(["addNew", "editInfo"]);
  const props = defineProps<IProps>();
  const pageName = props.contentConfig.pageName as string;
  const store = useStore();

  // 判断权限的另一种方式
  // const isCreate = usePremission(pageName, "create");
  const isDelete = usePremission(pageName, "delete");
  const isUpdate = usePremission(pageName, "update");
  // const isQuery = usePremission(pageName, "query");

  // 从 Vuex 获取数据
  const list = computed(() => store.getters["system/getDataList"](pageName));
  const total = computed(() => store.getters["system/getDataCount"](pageName));
  const queryInfo = computed(() => store.state.system.queryInfo);

  // 监听分页参数变化
  const pageInfo = ref({
    currentPage: 1,
    pageSize: 10,
    pageName: pageName
  });

  watch(
    pageInfo,
    () => {
      fetchPageList(queryInfo.value);
    },
    { deep: true }
  );

  // 发送请求
  const fetchPageList = (queryInfo?: any) => {
    store.dispatch("system/getPageListAction", {
      pageName: pageName,
      queryInfo: {
        pageNum: pageInfo.value.currentPage,
        pageSize: pageInfo.value.pageSize,
        ...queryInfo
      }
    });
  };
  fetchPageList(queryInfo.value);

  // 获取其他动态插槽
  const fixedSlotNames = ["status", "isActive", "handler"];
  const otherSlotNames: { slotName: string }[] =
    props.contentConfig.propList.filter((item) => {
      return item.slotName && !fixedSlotNames.includes(item?.slotName);
    });

  // 操作
  const handleAdd = () => {
    emit("addNew");
  };
  const handleEdit = (item: any) => {
    emit("editInfo", item);
  };
  const handleSwitchChange = (item: any) => {
    const {
      avatarUrl,
      departmentId,
      isActive,
      phone,
      realname,
      roleId,
      username,
      wid
    } = item;
    store.dispatch("system/editPageDataAction", {
      pageName,
      params: {
        avatarUrl,
        departmentId,
        isActive,
        phone,
        realname,
        roleId,
        username,
        wid
      }
    });
  };
  const handleDelete = async (item: any) => {
    const message =
      pageName === "department"
        ? "此操作将永久删除该部门，<span style='color: var(--el-color-danger);'>同时删除部门内的所有角色。</span>是否继续？"
        : "此操作将永久删除该数据，是否继续？";
    try {
      const options = {
        title: "删除确认",
        message: message,
        confirmText: "删除",
        cancelText: "取消",
        type: "warning" as IType
      };
      await confirmDialog(options);
      store.dispatch("system/removePageDataAction", {
        pageName: pageName,
        wid: item.wid,
        queryInfo: {
          pageNum: pageInfo.value.currentPage,
          pageSize: pageInfo.value.pageSize,
          ...queryInfo.value
        }
      });
    } catch (error) {
      console.log("取消删除");
    }
  };
  const handleTableRefresh = () => {
    fetchPageList(queryInfo.value);
  };
  defineExpose({
    fetchPageList
  });
</script>

<style scoped lang="less"></style>
