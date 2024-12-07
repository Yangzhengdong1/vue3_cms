import axios from "axios";
import { ElLoading } from "element-plus";

import type { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { IInterceptors, IRequestConfig } from "./types/request";

const DEFAULT_LOADING = false;

export default class Request {
  instance: AxiosInstance;
  interceptors?: IInterceptors;
  loadingInstance?: any;
  showLoading?: boolean;

  constructor(config: IRequestConfig) {
    this.instance = axios.create(config);
    // 从 config 中取出的拦截器是对应实例的拦截器
    this.interceptors = config.interceptors;
    this.showLoading = DEFAULT_LOADING;

    // 单个实例的请求拦截&&响应拦截
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    );
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    );

    // 所有实例的请求拦截&&响应拦截
    this.instance.interceptors.request.use(
      (config) => {
        if (this.showLoading) {
          this.loadingInstance = ElLoading.service({ text: "请求中......" });
        }
        // console.log("请求成功全局拦截");
        return config;
      },
      (error) => {
        // console.log("请求失败全局拦截");
        throw error;
      }
    );
    this.instance.interceptors.response.use(
      (res) => {
        // console.log("响应成功全局拦截");
        this.loadingInstance?.close();

        return res.data;
      },
      (error) => {
        // console.log("响应失败全局拦截");
        this.loadingInstance?.close();

        throw error;
      }
    );
  }

  // result 的类型由外界决定(T)
  request<T>(config: IRequestConfig<T>): Promise<T> {
    this.showLoading = config.isShowLoading;
    // 单个接口的请求成功拦截
    if (config.interceptors?.requestInterceptor) {
      config = config.interceptors.requestInterceptor(
        config as InternalAxiosRequestConfig
      );
    }
    return new Promise(async (resolve, reject) => {
      try {
        let result: T = await this.instance.request<any, T>(config);
        this.showLoading = DEFAULT_LOADING;
        // 单个接口的响应成功拦截
        if (config.interceptors?.responseInterceptor) {
          result = config.interceptors.responseInterceptor(result);
        }
        resolve(result);
      } catch (error) {
        this.showLoading = DEFAULT_LOADING;
        let err = error;
        // 单个接口的响应失败拦截
        if (config.interceptors?.responseInterceptorCatch) {
          err = config.interceptors.responseInterceptorCatch(error);
        }
        reject(err);
      }
    });
  }

  get<T>(config: IRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "GET" });
  }
  post<T>(config: IRequestConfig<T>) {
    return this.request<T>({ ...config, method: "POST" });
  }
  delete<T>(config: IRequestConfig<T>) {
    return this.request<T>({ ...config, method: "DELETE" });
  }
  patch<T>(config: IRequestConfig<T>) {
    return this.request<T>({ ...config, method: "PATCH" });
  }
}
