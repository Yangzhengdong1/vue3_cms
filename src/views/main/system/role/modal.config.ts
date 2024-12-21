import type { IFormItem, IForm } from "@/components/v-form";

const formItems: IFormItem[] = [
  {
    field: "name",
    defaultValue: "",
    type: "input",
    label: "角色名称",
    placeholder: "请输入角色名称"
  },
  {
    field: "departmentId",
    defaultValue: "",
    type: "cascader",
    label: "所属部门",
    options: [],
    otherOptions: {
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
    placeholder: "请选择角色所属部门"
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
    label: "用户等级",
    placeholder: "请选择用户等级"
  },
  {
    field: "permissions",
    defaultValue: "",
    type: "select",
    options: [],
    label: "角色权限",
    otherOptions: {
      multiple: true,
      collapseTags: true,
      collapseTagsTooltip: true,
      valueKey: "wid", // 绑定值为对象
      props: {
        value: "wid",
        label: "name"
      }
    },
    placeholder: "请选择角色拥有的权限"
  }
];

const formRules = {
  name: [
    {
      required: true,
      message: "角色名称不能为空~",
      trigger: "blur"
    },
    {
      pattern: /^(?!\d+$)[a-zA-Z\u4e00-\u9fa5\d]{2,10}$/,
      message: "角色名称需为2~10位字母或汉字~",
      trigger: "blur"
    }
  ],
  departmentId: [
    {
      required: true,
      message: "所属部门不能为空~",
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
