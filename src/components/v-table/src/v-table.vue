<template>
  <div class="v-table">
    <div class="v-table-header">
      <span>{{ title }}</span>
      <div class="btns">
        <!-- <el-button :icon="Refresh" v-if="refreshBtn" @click="handleTableRefresh"
          >刷新</el-button
        > -->
        <slot name="table-header">
          <!-- <el-button :icon="CirclePlus" class="confirm-button" type="primary">
            新增
          </el-button> -->
        </slot>
      </div>
    </div>
    <el-table
      :data="tableData"
      max-height="420px"
      border
      style="width: 100%"
      v-bind="tableProps"
    >
      <el-table-column
        v-if="expandColum"
        type="expand"
        width="55"
        align="center"
      >
        <template #default="scope">
          <slot name="expand" :row="scope.row">
            {{ scope.row }}
          </slot>
        </template>
      </el-table-column>
      <el-table-column
        v-if="selectionColum"
        type="selection"
        width="55"
        align="center"
      ></el-table-column>
      <el-table-column
        v-if="indexColum"
        type="index"
        width="60"
        label="序号"
        align="center"
      />
      <template v-for="item in propList" :key="item.prop">
        <el-table-column
          :prop="item.prop"
          :label="item.label"
          :min-width="item.minWidth"
          v-bind="item.otherAttr"
          align="center"
        >
          <template #default="scope">
            <!-- 将 row 传递给父组件，父组件接收：<component #slotName="scope" /> -->
            <slot :name="item.slotName" :row="scope.row">
              {{ scope.row[item.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <div class="v-table-footer" v-if="isFooter">
      <slot name="table-footer">
        <el-pagination
          v-model:current-page="page.currentPage"
          v-model:page-size="page.pageSize"
          :page-sizes="[10, 20, 30]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="dataCount"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { defineProps, withDefaults, defineEmits } from "vue";

  import type { IComponentProps } from "./types";

  const emits = defineEmits(["@update:page", "tableRefres"]);
  const props = withDefaults(defineProps<IComponentProps>(), {
    expandColum: false,
    selectionColum: false,
    indexColum: false,
    isFooter: true,
    refreshBtn: true,
    title: "",
    page: () => ({
      currentPage: 1,
      pageSize: 10
    }),
    tableProps: () => ({})
  });

  const handleSizeChange = (value: number) => {
    emits("@update:page", { ...props.page, pageSize: value });
  };

  const handleCurrentChange = (value: number) => {
    emits("@update:page", { ...props.page, currentPage: value });
  };
</script>

<style scoped lang="less">
  .v-table {
    padding: 20px 30px;
    border-top: 20px solid var(--el-background-color-page);
    .v-table-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 20px;
      .btns {
        display: flex;
        gap: 12px;
      }
    }

    .v-table-footer {
      display: flex;
      justify-content: center;
      align-content: center;
      margin-top: 20px;
    }
  }
</style>
