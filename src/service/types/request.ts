// 自定义类型

import type {
  InternalAxiosRequestConfig,
  AxiosRequestConfig,
  AxiosResponse
} from "axios";

export interface IInterceptors<T = AxiosResponse> {
  requestInterceptor?: (
    config: InternalAxiosRequestConfig
  ) => InternalAxiosRequestConfig;
  requestInterceptorCatch?: (err: any) => any;
  responseInterceptor?: (res: T) => T;
  responseInterceptorCatch?: (err: any) => any;
}

export interface IRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  // 为 requestConfig 类型扩展拦截器（IInterceptors）类型，在 new Request() 时可以传递不同的拦截器
  interceptors?: IInterceptors<T>;
  isShowLoading?: boolean;
}

export interface IDataType<T> {
  code: number;
  data: T;
  message: string;
}

export interface IPermissionsType<T> extends IDataType<T> {
  permissions: T;
}

export interface IListType<T> {
  code: number;
  totalCount?: number;
  pageNum?: number;
  list: T;
  message: string;
}
