<template>
  <div class="dashboard">
    <el-row :gutter="10">
      <el-col :span="8"><v-card title="测试1" /></el-col>
      <el-col :span="8"><v-card title="测试2" /></el-col>
      <el-col :span="8"><v-card title="测试3" /></el-col>
    </el-row>
    <el-row :gutter="10" class="dashboard-bottom">
      <el-col :span="14">
        <v-card title="测试4">
          <base-echart :options="option" />
        </v-card>
      </el-col>
      <el-col :span="10"><v-card title="测试5" /></el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
  import VCard from "@/components/v-card";
  import BaseEchart from "@/components/echart";
  import { EChartsOption } from "echarts";

  const option: EChartsOption = {
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    },
    yAxis: {
      type: "value"
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: "line",
        areaStyle: {}
      }
    ]
  };
</script>

<style scoped lang="less">
  .dashboard-bottom {
    margin-top: 20px;
  }
</style>
