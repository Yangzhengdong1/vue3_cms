import axios from "../index";
import { IDataType } from "@/service/types/request";
import {
  IAccount,
  ILoginResult,
  IUserInfoResult,
  IUserMenusResult
} from "../types/login";

enum LoginApi {
  AccountLogin = "/login",
  LoginUserInfo = "/user/info/",
  LoginUserMenus = "/menu/get-user-menu"
}

export const accountLoginService = (params: IAccount) => {
  const url = LoginApi.AccountLogin;
  return axios.post<IDataType<ILoginResult>>({
    url,
    data: params,
    isShowLoading: true
  });
};

export const getUserInfoService = (id: string) => {
  const url = LoginApi.LoginUserInfo + id;
  return axios.get<IDataType<IUserInfoResult>>({ url });
};

export const getUserMenusService = () => {
  const url = LoginApi.LoginUserMenus;
  return axios.get<IDataType<IUserMenusResult>>({ url });
};
