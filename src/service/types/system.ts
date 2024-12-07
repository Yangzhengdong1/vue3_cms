export interface IUserItem {
  wid: string;
  username: string;
  phone: number;
  departmentId: string;
  roleId: string;
  roleName: string;
  departmentName: string;
  isActive: number;
  avatarUrl: any;
  createTime: string;
  updateTime: string;
}

export type IUserList = IUserItem[];
