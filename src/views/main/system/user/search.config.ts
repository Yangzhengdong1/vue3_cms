import type { IFormItem, IForm } from "@/components/v-form";

const formItems: IFormItem[] = [
  // {
  //   field: "username",
  //   defaultValue: "",
  //   type: "input",
  //   label: "昵称",
  //   placeholder: "请输入用户昵称"
  // },

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
    placeholder: "请选择用户所属部门"
  },
  {
    field: "roleId",
    defaultValue: "",
    type: "select",
    options: [],
    label: "用户角色",
    otherOptions: {
      props: {
        value: "wid",
        label: "name"
      }
    },
    placeholder: "请选择用户角色"
  },
  {
    field: "status",
    defaultValue: "",
    type: "select",
    label: "状态",
    placeholder: "请选择用户状态",
    options: [
      {
        label: "启用",
        value: true
      },
      {
        label: "禁用",
        value: false
      }
    ]
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
  },
  {
    field: "realname",
    defaultValue: "",
    type: "input",
    label: "真实姓名",
    placeholder: "请输入用户真实姓名"
  },
  {
    field: "phone",
    defaultValue: "",
    type: "input",
    label: "手机号",
    placeholder: "请输入手机号码"
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
