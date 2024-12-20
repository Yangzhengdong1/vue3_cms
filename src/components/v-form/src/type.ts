type IFormTypes =
  | "input"
  | "select"
  | "password"
  | "datepicker"
  | "cascader"
  | "upload-img";
export interface IOption {
  label: string | number | boolean;
  value: string | number | boolean;
}

export interface IFormItem {
  field: string;
  defaultValue: any;
  type: IFormTypes;
  label: string;
  rules?: any[];
  placeholder?: string;
  options?: IOption[];
  otherOptions?: any;
  isHidden?: boolean;
}

export interface IForm {
  labelWidth?: string;
  labelItemStyle?: any;
  colLayout?: any;
  formItems: IFormItem[];
  formRules?: any;
}
