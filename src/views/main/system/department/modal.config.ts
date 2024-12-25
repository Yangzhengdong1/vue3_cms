import type { IFormItem, IForm } from "@/components/v-form";

const formItems: IFormItem[] = [
  {
    field: "name",
    defaultValue: "",
    type: "input",
    label: "部门名称",
    placeholder: "请输入部门名称"
  },
  {
    field: "parentId",
    defaultValue: "",
    type: "cascader",
    label: "上级部门",
    options: [],
    otherOptions: {
      filterable: true,
      relevance: false, // 是否需要根据部门请求角色列表
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
  }
];

const formRules = {
  name: [
    {
      required: true,
      message: "部门名称不能为空~",
      trigger: "blur"
    }
  ]
};

const colLayout = { span: 24 };

const labelWidth = "80px";

export const modalFormConfig: IForm = {
  formItems,
  labelWidth,
  colLayout,
  formRules
};
