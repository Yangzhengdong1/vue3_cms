<template>
  <div class="v-table">
    <div class="v-table-header">
      <span>{{ title }}</span>
      <div class="btns">
        <el-button :icon="Refresh" v-if="refreshBtn">刷新</el-button>
        <slot name="table-header">
          <el-button :icon="CirclePlus" class="confirm-button" type="primary">
            新增
          </el-button>
        </slot>
      </div>
    </div>
    <el-table
      :data="tableData"
      max-height="420px"
      border
      style="width: 100%"
      empty-text="暂无数据~"
    >
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
    <div class="v-table-footer">
      <slot name="table-footer">
        <el-pagination
          :page-sizes="[100, 200, 300, 400]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400"
        />
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { defineProps, withDefaults } from "vue";
  import { Refresh, CirclePlus } from "@element-plus/icons-vue";

  export interface IProp {
    prop: string;
    label?: string;
    minWidth?: string;
    slotName?: string;
    otherAttr?: object;
  }

  interface IComponentProps {
    tableData: any[];
    propList: IProp[];
    selectionColum?: boolean;
    indexColum?: boolean;
    title?: string;
    refreshBtn?: boolean;
  }
  withDefaults(defineProps<IComponentProps>(), {
    selectionColum: false,
    indexColum: false,
    refreshBtn: true,
    title: ""
  });
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
