<template>
  <div class="v-form">
    <div class="header">
      <slot name="header"></slot>
    </div>
    <el-form
      :label-width="labelWidth"
      ref="formRef"
      :model="modelValue"
      :rules="formRules"
    >
      <el-row>
        <template v-for="item in formItems" :key="item.label">
          <el-col v-bind="colLayout">
            <el-form-item
              v-if="!item.isHidden"
              :label="item.label"
              :style="labelItemStyle"
              :prop="item.field"
            >
              <template
                v-if="item.type === 'input' || item.type === 'password'"
              >
                <el-input
                  clearable
                  v-bind="item.otherOptions"
                  :placeholder="item.placeholder"
                  :show-password="item.type === 'password'"
                  :model-value="modelValue[item.field]"
                  @update:model-value="handleValueChange($event, item.field)"
                ></el-input>
              </template>
              <template v-else-if="item.type === 'select'">
                <el-select
                  clearable
                  v-bind="item.otherOptions"
                  :placeholder="item.placeholder"
                  :model-value="modelValue[item.field]"
                  @update:model-value="handleValueChange($event, item.field)"
                >
                  <!-- 绑定值为对象 -->
                  <template
                    v-if="item.otherOptions && item.otherOptions.valueKey"
                  >
                    <el-option
                      v-for="option in item.options"
                      :key="item.otherOptions ? (option as any )[item.otherOptions.props.value] : option.value"
                      :label="item.otherOptions ? (option as any )[item.otherOptions.props.label] : option.label"
                      :value="option"
                    >
                    </el-option>
                  </template>
                  <template v-else>
                    <el-option
                      v-for="option in item.options"
                      :key="item.otherOptions ? (option as any )[item.otherOptions.props.value] : option.value"
                      :label="item.otherOptions ? (option as any )[item.otherOptions.props.label] : option.label"
                      :value="item.otherOptions ? (option as any )[item.otherOptions.props.value] : option.value"
                    >
                    </el-option>
                  </template>
                </el-select>
              </template>
              <template v-else-if="item.type === 'datepicker'">
                <el-date-picker
                  v-bind="item.otherOptions"
                  :model-value="modelValue[item.field]"
                  @update:model-value="handleValueChange($event, item.field)"
                  clearable
                >
                </el-date-picker>
              </template>
              <template v-else-if="item.type === 'cascader'">
                <el-cascader
                  v-bind="item.otherOptions"
                  :placeholder="item.placeholder"
                  :model-value="modelValue[item.field]"
                  :options="item.options"
                  :show-all-levels="false"
                  @update:model-value="handleValueChange($event, item.field)"
                  clearable
                />
              </template>
              <template v-else-if="item.type === 'upload-img'">
                <v-upload-img
                  :model-value="modelValue[item.field]"
                  @update:model-value="handleValueChange($event, item.field)"
                />
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
  import {
    defineProps,
    defineEmits,
    defineExpose,
    PropType,
    watch,
    ref
  } from "vue";
  import { ElForm } from "element-plus";

  import { IFormItem } from "./type";
  import VUploadImg from "@/components/v-upload";
  import { getPageList } from "@/service/main/system/system.service";

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

    formRules: {
      type: Object,
      default: () => ({})
    },

    formItems: {
      type: Array as PropType<IFormItem[]>,
      default: () => []
    }
  });

  // 部门与角色是否联动
  const departmentItem = props.formItems.find(
    (item) => item.field === "departmentId"
  );
  const isRelevance = departmentItem && departmentItem.otherOptions?.relevance;

  watch(
    () => props.modelValue,
    async (newValue, oldValue) => {
      if (newValue?.departmentId && isRelevance) {
        Object.keys(newValue).forEach(async (key) => {
          if (
            oldValue &&
            newValue[key] !== oldValue[key] &&
            key === "departmentId"
          ) {
            // 请求部门下角色
            try {
              const result = await getPageList("/role/get-list", {
                departmentId: newValue?.departmentId
              });
              const roleItem = props.formItems.find(
                (item) => item.field === "roleId"
              );
              if (result && result.code === 0) {
                (roleItem!.options as any) = result.list;
              }
            } catch (error) {
              console.log(error, "请求部门下角色出错");
            }
          }
        });
      }
    },
    {
      immediate: true,
      deep: true
    }
  );

  const handleValueChange = (value: any, field: string) => {
    // console.log("v-form:update:modelValue", field);
    // 在发送这个事件时，父组件会直接修改元数据，不必再在父组件显式监听 update:modelValue
    emit("update:modelValue", { ...props.modelValue, [field]: value });
  };

  // 表单校验

  const formRef = ref<InstanceType<typeof ElForm>>();
  defineExpose({
    formRef
  });
</script>

<style scoped lang="less">
  .v-form {
    padding-top: 20px;
  }
</style>
