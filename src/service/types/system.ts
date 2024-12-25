export interface IUserItem {
  wid: string;
  username: string;
  phone: string;
  departmentId: string;
  roleId: string;
  roleName: string;
  departmentName: string;
  isActive: boolean;
  avatarUrl: any;
  createTime: string;
  updateTime: string;
}

export interface IGoodsItem {
  wid: string;
  title: string;
  description: string;
  img_url: string;
  price: number;
  createTime: string;
  updateTime: string;
}

export interface IRoleItem {
  wid: string;
  name: string;
  description: string;
  departmentId: string;
  departmentName: string;
  level: string;
  createTime: string;
  updateTime: string;
}

interface IStoryItem {
  wid: string;
  content: string;
  utterer: string;
  createTime: string;
  timeAgo: string;
  height?: number | string;
}

export type IUserList = IUserItem[];
export type IGoodsList = IGoodsItem[];
export type IRoleList = IRoleItem[];
export type IStoryList = IStoryItem[];
