export interface IContentConfig {
  pageName: string;
  propList: any[];
  childrenProps?: any;
}

export interface IRoleLeevelMap {
  "Super Administrator": "danger"; // 超管
  Administrator: "warning"; // 管理员
  "Advanced User": "primary"; // 高级用户
  "Regular User": "success"; // 普通用户
  Guest: "info"; // 游客
}

export interface IProps {
  contentConfig: IContentConfig;
  roleLevelMap?: IRoleLeevelMap;
}
