<template>
  <div class="user">
    <page-search :search-form-config="searchFormConfig" />
    <v-table
      title="用户列表"
      :table-data="userList"
      :prop-list="propList"
      :selection-colum="true"
      :index-colum="true"
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
        <el-tag v-if="scope.row.roleName" type="primary">
          {{ scope.row.roleName }}
        </el-tag>
      </template>
    </v-table>
  </div>
</template>

<script setup lang="ts">
  import { computed } from "vue";
  import { Hide, View } from "@element-plus/icons-vue";

  import PageSearch from "@/components/page-search";
  import VTable from "@/components/v-table";
  import { searchFormConfig } from "./form.config";

  import { useStore } from "@/store/index";
  import type { IUserList } from "@/service/types/system";

  const store = useStore();
  store.dispatch("system/getPageListAction", {
    url: "/user/get-list",
    queryInfo: { pageSize: 1, pageNum: 100 }
  });

  const userList = computed<IUserList>(() => store.state.system.list);
  const propList = [
    {
      prop: "username",
      minWidth: "100",
      label: "用户名",
      slotName: "username"
    },
    {
      prop: "roleName",
      minWidth: "120",
      label: "角色",
      slotName: "roleName"
    },
    {
      prop: "realname",
      minWidth: "100",
      label: "真实姓名"
    },
    {
      prop: "phone",
      minWidth: "120",
      label: "手机号"
    },
    {
      prop: "isActive",
      minWidth: "120",
      label: "是否启用",
      slotName: "isActive"
    },
    {
      prop: "departmentName",
      minWidth: "120",
      label: "所属部门"
    },
    {
      prop: "createTime",
      minWidth: "175",
      label: "创建时间"
    }
  ];

  const roles = [
    { name: "总裁", color: "#FF4D4F", level: "超级管理员" },
    { name: "总裁助理", color: "#FAAD14", level: "管理员" },
    { name: "销售经理", color: "#1890FF", level: "高级用户" },
    { name: "销售人员", color: "#52C41A", level: "普通用户" },
    { name: "访客", color: "#BFBFBF", level: "访客" }
  ];
</script>

<style scoped lang="less"></style>
