import type { Module } from "vuex";

import localCache from "@/utils/local-cache";
import mapMenusToRoutes, { pathMapToMenus } from "@/utils/map-menus";

import router from "@/router";
import {
  accountLoginService,
  getUserInfoService,
  getUserMenusService
} from "@/service/login/login.service";

import type { IRootState, ILoginState } from "../types";
import type {
  IAccount,
  IUserInfoResult,
  IUserMenusResult
} from "@/service/types/login";

// 默认菜单
const welcome = {
  wid: "welcome-id",
  name: "welcome",
  icon: "Platform",
  url: "/main/welcome",
  parentId: null,
  createTime: "2024-11-21 16:43:08",
  updateTime: "2024-11-21 16:43:08",
  childrens: []
};

const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: "",
      userInfo: {},
      userMenus: [],
      currentMenu: {}
    };
  },
  mutations: {
    changeToken(state, token: string) {
      state.token = token;
    },
    changeUserInfo(state, userInfo: IUserInfoResult) {
      state.userInfo = userInfo;
      localCache.setCache("userInfo", userInfo, "local");
    },
    changeUserMenus(state, userMenus: IUserMenusResult) {
      state.userMenus = userMenus;
      localCache.setCache("userMenus", state.userMenus, "local");

      // 动态注册路由
      const routes = mapMenusToRoutes(state.userMenus);
      routes.forEach((route) => router.addRoute("main", route));
    },
    changeCurrentMenu(state, currentMenu: IUserMenusResult) {
      state.currentMenu = currentMenu;
    }
  },
  actions: {
    async accountLoginAction(ctx, payload: IAccount) {
      console.log("执行 accountLoginAction ", payload);
      const loginResult = await accountLoginService(payload);
      if (loginResult && loginResult.code !== 0) {
        console.log("登录出错！");
        return;
      }
      const { id, token } = loginResult.data;
      ctx.commit("changeToken", token);
      localCache.setCache("token", token, "local");
      localCache.setCache("userId", id, "local");

      // 获取用户信息
      ctx.dispatch("getUserInfoAction", id);

      // 获取用户所属部门菜单
      ctx.dispatch("getUserMenusAction");

      // 将当前路由缓存，跳转时取出来
      router.replace("/main");

      // 设置当前菜单
      ctx.dispatch("getCurrentUserMenu", "/main/welcome");
    },

    async getUserInfoAction(ctx, id: string) {
      try {
        const userInfoResult = await getUserInfoService(id);
        if (userInfoResult && userInfoResult.code === 0) {
          const { data: userInfo } = userInfoResult;
          ctx.commit("changeUserInfo", userInfo);
        }
      } catch (error) {
        console.log("请求用户信息出错！");
      }
    },

    async getUserMenusAction(ctx) {
      // todo: 请求后需要做个判断，数据是否发生变化，无变化不写入
      try {
        ctx.commit("changeUserMenus", [welcome]);
        const menusResult = await getUserMenusService();
        console.log("getUserMenusAction");
        if (menusResult && menusResult.code === 0) {
          const { data: userMenus } = menusResult;
          ctx.commit("changeUserMenus", [welcome, ...userMenus]);
        }
      } catch (error) {
        console.log("请求用户菜单出错！");
      }
    },

    getCurrentUserMenu(ctx, path) {
      const currentMenu = pathMapToMenus(ctx.state.userMenus, path);
      ctx.commit("changeCurrentMenu", currentMenu);
    },

    // 刷新时重载登录相关数据
    async loadLocalLogin({ commit, dispatch, state }) {
      const token = localCache.getCache("token", "local");
      if (token) {
        commit("changeToken", token);

        // 刷新时需要重新请求用户信息以及菜单
        const id = localCache.getCache("userId", "local");
        await dispatch("getUserInfoAction", id);
        await dispatch("getUserMenusAction");
      }
    }
  }
};

export default loginModule;
