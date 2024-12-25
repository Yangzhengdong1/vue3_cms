<template>
  <div class="department">
    <page-search
      :page-name="pageName"
      :search-form-config="searchFormConfigRef"
      @serch-confirm="handleQuery"
    />
    <page-content
      ref="pageContentRef"
      :content-config="contentConfig"
      @add-new="handleAddData"
      @edit-info="handleEditData"
    >
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

    <page-modal
      ref="pageModalRef"
      :page-name="pageName"
      :modal-form-config="modalFormConfigRef"
      :default-info="defaultInfo"
      :other-info="otherInfo"
      :dialog-title="defaultInfo.wid ? '编辑部门' : '新增部门'"
    >
      <div class="menu-tree">
        <span>菜单权限</span>
        <el-tree
          ref="treeRef"
          :data="menus"
          show-checkbox
          default-expand-all
          node-key="wid"
          :props="{ label: 'name', children: 'childrens' }"
          @check="handleMenuCheck"
        />
      </div>
    </page-modal>
  </div>
</template>

<script setup lang="ts">
  import { computed, nextTick, ref } from "vue";
  import { useStore } from "@/store";

  import { ElTree } from "element-plus";
  import PageContent from "@/components/page-content";
  import PageSearch from "@/components/page-search";
  import PageModal from "@/components/page-modal";

  import { searchFormConfig } from "./search.config";
  import { contentConfig, roleLevelMap } from "./table.config";
  import { modalFormConfig } from "./modal.config";

  import { usePageContent } from "@/hooks/use-page-content";
  import { usePageModal } from "@/hooks/use-page-modal";

  const pageName = "department";

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

  const modalFormConfigRef = computed(() => {
    const departmentItem = modalFormConfig.formItems.find(
      (item) => item.field === "parentId"
    );
    departmentItem!.options = store.state.integrityDepartment;
    return modalFormConfig;
  });

  // 部门树相关逻辑
  const otherInfo = ref({});
  const menus = computed(() => store.state.integrityMenu);
  const treeRef = ref<InstanceType<typeof ElTree>>();
  const handleMenuCheck = (data: any, checData: any) => {
    const checkedNodes = [
      ...checData.checkedNodes,
      ...checData.halfCheckedNodes
    ];
    const menus = checkedNodes.map((item: any) => ({
      wid: item.wid,
      name: item.name
    }));
    otherInfo.value = { menus };
  };
  const editCallback = (item: any) => {
    // 设置树回显
    const checkedKeys = item.menus
      .filter((item: any) => item.parentId !== null)
      .map((item: any) => item.wid);
    otherInfo.value = { menus: item.menus };
    nextTick(() => {
      treeRef.value?.setCheckedKeys(checkedKeys);
    });
  };
  const [pageModalRef, defaultInfo, handleAddData, handleEditData] =
    usePageModal(undefined, editCallback);
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
  .menu-tree {
    display: flex;
    padding-left: 40px;
    .el-tree {
      flex: 1;
      max-height: 280px;
      overflow: auto;
    }
  }
</style>
