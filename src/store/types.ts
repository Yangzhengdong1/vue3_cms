export interface IRootState {
  name: string;
}

export interface ILoginState {
  userInfo: any;
  token: string;
  userMenus: any;
  currentMenu: any;
}

export interface ISystemState {
  userList: any[];
  userTotalCount: number | string;
}

export interface IRootWithModule {
  login: ILoginState;
  system: ISystemState;
}

export type IStoreType = IRootState & IRootWithModule;
