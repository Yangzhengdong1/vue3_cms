<template>
  <div class="department">
    <page-search
      page-name="department"
      :search-form-config="searchFormConfigRef"
      @serch-confirm="handleQuery"
    />
    <page-content ref="pageContentRef" :content-config="contentConfig">
      <template #expand="scope">
        <div class="department-expand-box">
          <!-- 角色 -->
          <div class="department-roles">
            <span>角色</span>
            <div class="tags">
              <el-tag
                v-for="role in scope.row.roles"
                :type="(roleLevelMap as any)[role.level]"
                :key="role.wid"
              >
                {{ role.name }}
              </el-tag>
            </div>
            <p v-if="!scope.row.roles.length">当前部门暂无角色~</p>
          </div>
          <div class="department-menus-user">
            <!-- 菜单 -->
            <div class="department-menus">
              <span>菜单</span>
              <el-table :data="scope.row.menus" border>
                <el-table-column
                  align="center"
                  min-width="160"
                  label="菜单id"
                  prop="wid"
                />
                <el-table-column align="center" label="菜单名称" prop="name" />
              </el-table>
            </div>
            <!-- 人员 -->
            <div class="department-users">
              <span>成员</span>
              <el-table :data="scope.row.users" border align="center">
                <el-table-column
                  align="center"
                  min-width="160"
                  label="用户id"
                  prop="wid"
                />
                <el-table-column align="center" label="成员姓名" prop="name" />
              </el-table>
            </div>
          </div>
        </div>
      </template>
    </page-content>
  </div>
</template>

<script setup lang="ts">
  import { computed } from "vue";
  import { useStore } from "@/store";

  import PageContent from "@/components/page-content";
  import PageSearch from "@/components/page-search";
  import { searchFormConfig } from "./search.config";
  import { contentConfig, roleLevelMap } from "./table.config";

  import { usePageContent } from "@/hooks/use-page-content";

  const [pageContentRef, handleQuery] = usePageContent();

  // 动态添加 options
  const store = useStore();

  const searchFormConfigRef = computed(() => {
    const departmentItem = searchFormConfig.formItems.find(
      (item) => item.field === "parentId"
    );

    departmentItem!.options = store.state.integrityDepartment;

    return searchFormConfig;
  });
</script>

<style scoped lang="less">
  .department-expand-box {
    padding: 15px 55px;
    .department-roles,
    .department-menus,
    .department-users {
      display: flex;
      > span {
        font-weight: 600;
        margin-right: 20px;
        min-width: 30px;
      }
    }
    .department-menus-user {
      display: flex;
      width: 100%;
      .department-menus,
      .department-users {
        flex: 1;
      }
      .department-users {
        margin-left: 20px;
      }
    }

    .department-roles {
      align-items: center;
      margin-bottom: 20px;

      .el-tag {
        margin-right: 10px;
      }
    }
  }
</style>
