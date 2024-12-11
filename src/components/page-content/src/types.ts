export interface IContentConfig {
  pageName: string;
  propList: any[];
  tableProps?: any; // 表格的其他属性
  otherComponentProps: any; // 组件的其他属性
}

export interface IProps {
  contentConfig: IContentConfig;
}
