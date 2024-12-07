export interface IAccount {
  username: string;
  password: string;
}

export interface ILoginResult {
  id: string;
  username: string;
  phone: number;
  token: string;
}

// 如果接口返回的数据结构过于复杂，可以直接 any
export interface IUserInfoResult {
  username: string;
  roleName: string;
  departmentName: string;
  wid: string;
  roleId: string;
  departmentId: string;
  phone: number;
  createTime: string;
  updateTime: string;
  avatarUrl: string;
}

export interface IMenusChildren {
  wid: string;
  name: string;
  icon: any;
  url: any;
  parentId: string;
  createTime: string;
  updateTime: string;
  childrens: any[];
}

export type IUserMenusResult = IMenusChildren[];
