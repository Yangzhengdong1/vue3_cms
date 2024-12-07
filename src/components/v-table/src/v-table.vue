<template>
  <div class="v-table">
    <el-table
      :data="tableData"
      max-height="500px"
      border
      style="width: 100%"
      empty-text="暂无数据~"
    >
      <template v-for="item in propList" :key="item.prop">
        <el-table-column
          :prop="item.prop"
          :label="item.label"
          :min-width="item.minWidth"
          align="center"
        >
          <template #default="scope">
            <slot :name="item.slotName" :row="scope.row">
              {{ scope.row[item.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
  </div>
</template>

<script setup lang="ts">
  import { defineProps, PropType } from "vue";

  interface IProp {
    prop: string;
    label: string;
    minWidth: string;
    slotName?: string;
  }
  defineProps({
    tableData: {
      type: Array,
      required: true
    },

    propList: {
      type: Array as PropType<IProp[]>,
      required: true
    }
  });
</script>

<style scoped lang="less">
  .v-table {
    padding: 20px 30px;
    border-top: 20px solid #f0f2f5;
  }
</style>
