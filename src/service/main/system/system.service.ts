import axios from "@/service/index";
import type { IListType } from "@/service/types/request";
import type { IUserList } from "@/service/types/system";

export const getPageList = (url: string, params: any) => {
  return axios.post<IListType<IUserList>>({
    url,
    data: params
  });
};
