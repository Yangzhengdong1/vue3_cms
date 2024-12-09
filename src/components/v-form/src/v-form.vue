<template>
  <div class="v-form">
    <div class="header">
      <slot name="header"></slot>
    </div>
    <el-form :label-width="labelWidth">
      <el-row>
        <template v-for="item in formItems" :key="item.label">
          <el-col v-bind="colLayout">
            <el-form-item
              :label="item.label"
              :rules="item.rules"
              :style="labelItemStyle"
            >
              <template
                v-if="item.type === 'input' || item.type === 'password'"
              >
                <el-input
                  :placeholder="item.placeholder"
                  :show-password="item.type === 'password'"
                  v-model="formData[item.field]"
                ></el-input>
              </template>
              <template v-else-if="item.type === 'select'">
                <el-select
                  :placeholder="item.placeholder"
                  v-model="formData[item.field]"
                >
                  <el-option
                    v-for="option in item.options"
                    :key="option.value"
                    :label="option.label"
                    :value="option.value"
                  >
                  </el-option>
                </el-select>
              </template>
              <template v-else-if="item.type === 'datepicker'">
                <el-date-picker
                  v-bind="item.otherOptions"
                  v-model="formData[item.field]"
                >
                </el-date-picker>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { defineProps, watch, defineEmits, PropType, ref } from "vue";
  import { IFormItem } from "./type";

  const emit = defineEmits(["update:modelValue"]);
  const props = defineProps({
    modelValue: {
      type: Object,
      required: true
    },
    labelWidth: {
      type: String,
      default: "100px"
    },

    labelItemStyle: {
      type: Object,
      default: () => ({ padding: "10px 30px" })
    },
    colLayout: {
      type: Object,
      default: () => ({
        xs: 24, // 小屏幕时，每个占满一行（全宽）
        sm: 12, // 在小屏幕设备上，每个占据 12 栏位
        md: 8, // 在中等屏幕上，每个占据 8 栏位，3 列
        lg: 6, // 在大屏幕上，每个占据 6 栏位，4 列
        xl: 6 // 在超大屏幕上，仍然是每个占 6 栏位，4 列
      })
    },

    formItems: {
      type: Array as PropType<IFormItem[]>,
      default: () => []
    }
  });

  // 浅拷贝父组件传递过来的值，防止表单 v-model 绑定时越级修改父组件的值
  const formData = ref({ ...props.modelValue });
  watch(
    formData,
    () => {
      emit("update:modelValue", formData);
    },
    { deep: true }
  );
</script>

<style scoped lang="less">
  .v-form {
    padding-top: 22px;
  }
</style>
