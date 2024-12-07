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

export type IUserList = IUserItem[];
