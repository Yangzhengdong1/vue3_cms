import type { IFormItem, IForm } from "@/components/v-form";

const formItems: IFormItem[] = [
  {
    field: "username",
    defaultValue: "",
    type: "input",
    label: "名称",
    placeholder: "请输入具体名称"
  },
  {
    field: "password",
    defaultValue: "",
    type: "password",
    label: "密码",
    placeholder: "请输入密码"
  },
  {
    field: "status",
    defaultValue: true,
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
    label: "时间",
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
