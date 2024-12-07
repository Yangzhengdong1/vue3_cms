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
  list: any[];
  totalCount: number | string;
}

export interface IRootWithModule {
  login: ILoginState;
  system: ISystemState;
}

export type IStoreType = IRootState & IRootWithModule;
