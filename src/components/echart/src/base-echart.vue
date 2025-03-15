<template>
  <div class="base-echart">
    <div
      class="echarts-instance"
      ref="echartsElement"
      :style="{ width, height }"
    ></div>
  </div>
</template>

<script setup lang="ts">
  import { ref, defineProps, withDefaults, onMounted } from "vue";
  import * as echarts from "echarts";
  import { EChartsOption } from "echarts";

  interface IProps {
    width?: string;
    height?: string;
    options: EChartsOption;
  }
  const props = withDefaults(defineProps<IProps>(), {
    width: "100%",
    height: "248px"
  });

  const echartsElement = ref<HTMLDivElement>();
  onMounted(() => {
    const echartsInstance = echarts.init(echartsElement.value);
    echartsInstance.setOption(props.options);
  });
</script>

<style scoped></style>
