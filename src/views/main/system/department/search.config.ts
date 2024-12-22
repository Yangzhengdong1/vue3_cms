import type { IFormItem, IForm } from "@/components/v-form";

const formItems: IFormItem[] = [
  {
    field: "parentId",
    defaultValue: "",
    type: "cascader",
    label: "上级部门",
    options: [],
    otherOptions: {
      filterable: true,
      props: {
        value: "wid",
        label: "name",
        children: "childrens",
        multiple: false,
        expandTrigger: "hover",
        checkStrictly: true,
        emitPath: false
      },
      style: { width: "100%" }
    },
    placeholder: "请选择上级部门"
  },
  {
    field: "departmentName",
    defaultValue: "",
    type: "input",
    label: "部门名称",
    placeholder: "请输入部门名称"
  },
  {
    field: "dateTime",
    defaultValue: [],
    type: "datepicker",
    label: "创建时间",
    otherOptions: {
      "value-format": "YYYY-MM-DD",
      type: "daterange",
      startPlaceholder: "请选择开始时间",
      endPlaceholder: "请选择结束时间"
    }
  }
];

const colLayout = {
  xs: 24,
  sm: 12,
  md: 8,
  lg: 8,
  xl: 6
};

const labelWidth = "120px";

export const searchFormConfig: IForm = {
  formItems,
  labelWidth,
  colLayout
};
