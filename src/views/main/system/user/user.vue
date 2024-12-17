<template>
  <div class="user">
    <page-search
      :search-form-config="searchFormConfigRef"
      @serch-confirm="handleQuery"
      @reset-form="handleReset"
    />
    <page-content ref="pageContentRef" :content-config="contentConfig">
      <template #roleName="scope">
        <el-tag
          v-if="scope.row.roleName"
          :type="(roleLevelMap as any)[scope.row.level]"
        >
          {{ scope.row.roleName }}
        </el-tag>
      </template>
    </page-content>
  </div>
</template>

<script setup lang="ts">
  import { computed } from "vue";
  import { useStore } from "@/store";
  import { usePageContent } from "@/hooks/use-page-content";

  import PageContent from "@/components/page-content";
  import PageSearch from "@/components/page-search";
  import { searchFormConfig } from "./search.config";
  import { contentConfig, roleLevelMap } from "./table.config";

  const [pageContentRef, handleQuery, handleReset] = usePageContent();

  // 获取 vuex 中的数据
  const store = useStore();
  const roleOptions = store.state.integrityRole;
  const departmentOptions = store.state.integrityDepartment;

  // 动态添加下拉框与级联选择器的 options
  /*
   * tips: 这里必须使用 computed 包裹一下，保持对数据的引用，只有这样才能在 integrityRole/integrityDepartment 发生改变的时候重新刷新组件
   *       如果直接 roleItem!.options = roleOptions; 在当前页面刷新时，可能数据还没从接口请求回来，vuex 中的 integrityRole 还没数据
   *       就会导致菜单列表为空
   */
  const searchFormConfigRef = computed(() => {
    const roleItem = searchFormConfig.formItems.find(
      (item) => item.field === "roleId"
    );
    const departmentItem = searchFormConfig.formItems.find(
      (item) => item.field === "departmentId"
    );
    roleItem!.options = roleOptions;
    departmentItem!.options = departmentOptions;
    return searchFormConfig;
  });
</script>

<style scoped lang="less"></style>
