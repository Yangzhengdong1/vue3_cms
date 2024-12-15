import type { IFormItem, IForm } from "@/components/v-form";

const formItems: IFormItem[] = [
  {
    field: "title",
    defaultValue: "",
    type: "input",
    label: "商品名称",
    placeholder: "请输入商品名称"
  },
  {
    field: "description",
    defaultValue: "",
    type: "input",
    label: "商品描述",
    placeholder: "请输入商品描述"
  },
  {
    field: "dateTime",
    defaultValue: [],
    type: "datepicker",
    label: "商品创建时间",
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
