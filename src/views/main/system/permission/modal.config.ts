import type { IFormItem, IForm } from "@/components/v-form";

const formItems: IFormItem[] = [
  {
    field: "name",
    defaultValue: "",
    type: "input",
    label: "权限名称",
    otherOptions: {
      disabled: true
    },
    placeholder: "请输入权限名称"
  },
  {
    field: "description",
    defaultValue: "",
    type: "input",
    label: "权限描述",
    placeholder: "请输入权限描述"
  }
];

const formRules = {};

const colLayout = { span: 24 };

const labelWidth = "80px";

export const modalFormConfig: IForm = {
  formItems,
  labelWidth,
  colLayout,
  formRules
};
