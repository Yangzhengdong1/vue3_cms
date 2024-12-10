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
        <el-tag
          v-if="scope.row.roleName"
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
  import { computed } from "vue";
  import { Hide, View, Edit, Delete } from "@element-plus/icons-vue";

  import PageSearch from "@/components/page-search";
  import VTable from "@/components/v-table";
  import { searchFormConfig } from "./form.config";

  import { useStore } from "@/store/index";
  import type { IUserList } from "@/service/types/system";
  import { IProp } from "@/components/v-table/src/v-table.vue";

  const store = useStore();
  store.dispatch("system/getPageListAction", {
    url: "/user/get-list",
    queryInfo: { pageNum: 1, pageSize: 100 }
  });

  const userList = computed<IUserList>(() => store.state.system.list);
  const propList: IProp[] = [
    {
      prop: "username",
      minWidth: "100",
      label: "用户名",
      slotName: "username",
      otherAttr: {
        showOverflowTooltip: true
      }
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
      label: "真实姓名",
      otherAttr: {
        showOverflowTooltip: true
      }
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
    },
    {
      prop: "handler",
      minWidth: "120",
      slotName: "handler"
    }
  ];

  const roleLevelMap = {
    "Super Administrator": "danger", // 超管
    Administrator: "warning", // 管理员
    "Advanced User": "primary", // 高级用户
    "Regular User": "success", // 普通用户
    Guest: "info" // 游客
  };
</script>

<style scoped lang="less"></style>
