export interface IRootState {
  name: string;
  integrityRole: any[];
  integrityDepartment: any[];
  integrityLevel: any[];
  integrityPermission: any[];
  integrityMenu: any[];
}

export interface ILoginState {
  userInfo: any;
  token: string;
  userMenus: any;
  currentMenu: any;
  userPermissions: string[];
}

export interface ISystemState {
  queryInfo: any;
  userList: any[];
  userTotalCount: number | string;
  roleList: any[];
  roleTotalCount: number | string;
  goodsList: any[];
  goodsTotalCount: number | string;
  menuList: any[];
  menuTotalCount: number | string;
  departmentList: any[];
  departmentTotalCount: number | string;
}

export interface IRootWithModule {
  login: ILoginState;
  system: ISystemState;
}

export type IStoreType = IRootState & IRootWithModule;
