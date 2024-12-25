import type { IFormItem, IForm } from "@/components/v-form";

const formItems: IFormItem[] = [
  {
    field: "name",
    defaultValue: "",
    type: "input",
    label: "菜单名称",
    placeholder: "请输入菜单名称"
  },
  {
    field: "icon",
    defaultValue: "",
    type: "input",
    label: "菜单icon",
    placeholder: "请输入 element-plus 所拥有的icon名称"
  },
  {
    field: "url",
    defaultValue: "",
    type: "input",
    label: "菜单路径",
    placeholder: "请输入系统路由所对应的路径"
  },
  {
    field: "parentId",
    defaultValue: "",
    type: "cascader",
    label: "上级菜单",
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
    placeholder: "请选择上级菜单"
  }
];

const formRules = {
  name: [
    {
      required: true,
      message: "菜单名称不能为空~",
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
