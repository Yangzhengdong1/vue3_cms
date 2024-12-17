import axios from "@/service/index";
import type { IDataType, IListType } from "@/service/types/request";
import type { IUserList } from "@/service/types/system";

export const getPageList = (url: string, params: any) => {
  return axios.post<IListType<IUserList>>({
    url,
    data: params,
    isShowLoading: true
  });
};

export const getDictTable = (tableName: string) => {
  const url = `/dict_table/${tableName}`;
  return axios.get<IDataType<any>>({
    url
  });
};
