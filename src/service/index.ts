import localCache from "@/utils/local-cache";
import { BASE_URL, TIMEOUT } from "./config";
import Request from "./request";
import router from "@/router";

export default new Request({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
  interceptors: {
    requestInterceptor: (config) => {
      const token = localCache.getCache("token", "local");
      if (token) {
        config.headers.Authorization = "Bearer " + token;
      }
      // console.log("请求成功拦截~");
      return config;
    },
    requestInterceptorCatch: (err) => {
      // console.log("请求失败拦截~");
      throw err;
    },
    responseInterceptor: (res) => {
      // console.log("响应成功拦截~", res);
      return res;
    },
    responseInterceptorCatch: (err) => {
      if (err.status === 400) {
        localCache.removeCache("token", "local");
        localCache.removeCache("userInfo", "local");
        localCache.removeCache("userMenus", "local");
        localCache.removeCache("userId", "local");
        router.replace("/login");
      }
      throw err;
    }
  }
});
