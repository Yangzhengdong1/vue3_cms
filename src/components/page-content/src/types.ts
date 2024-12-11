export interface IContentConfig {
  pageName: string;
  propList: any[];
  childrenProps?: any;
}

export interface IProps {
  contentConfig: IContentConfig;
}
