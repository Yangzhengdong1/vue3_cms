export interface IRootState {
  name: string;
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
  goodsList: any[];
  goodsTotalCount: number | string;
}

export interface IRootWithModule {
  login: ILoginState;
  system: ISystemState;
}

export type IStoreType = IRootState & IRootWithModule;
