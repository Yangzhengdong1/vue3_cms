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

export const uploadImage = (formData: any) => {
  const url = "/upload/upload-img";
  return axios.post<IDataType<any>>({
    url,
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data"
    },
    onUploadProgress: (progressEvent) => {
      const percent = Math.round(
        (progressEvent.loaded / (progressEvent as any).total) * 100
      );
      console.log(`上传进度：${percent}%`);
    },
    isShowLoading: true
  });
};

export const createPageData = (url: string, params: any) => {
  return axios.post<IDataType<any>>({
    url,
    data: params,
    isShowLoading: true
  });
};

export const editPageData = (url: string, params: any) => {
  return axios.post<IDataType<any>>({
    url,
    data: params,
    isShowLoading: true
  });
};
