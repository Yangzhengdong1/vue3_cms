import type { IFormItem, IForm } from "@/components/v-form";

const formItems: IFormItem[] = [
  {
    field: "departmentId",
    defaultValue: "",
    type: "cascader",
    label: "所属部门",
    options: [],
    otherOptions: {
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
    placeholder: "请选择角色所属部门"
  },
  {
    field: "roleName",
    defaultValue: "",
    type: "input",
    label: "角色名称",
    placeholder: "请输入角色名称"
  },
  {
    field: "description",
    defaultValue: "",
    type: "input",
    label: "角色描述",
    placeholder: "请输入角色描述"
  },

  {
    field: "level",
    defaultValue: "",
    type: "select",
    options: [],
    label: "角色等级",
    placeholder: "请选择角色等级"
  },
  {
    field: "dateTime",
    defaultValue: [],
    type: "datepicker",
    label: "角色创建时间",
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
