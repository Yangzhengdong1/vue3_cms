import type { Module } from "vuex";

import type { IRootState, ISystemState } from "@/store/types";
import type {
  IUserList,
  IGoodsList,
  IRoleList,
  IStoryList
} from "@/service/types/system";
import {
  createPageData,
  getPageList,
  removePageData
} from "@/service/main/system/system.service";
import { IUserMenusResult } from "@/service/types/login";
import message from "@/utils/message";
import crypto from "@/utils/crypto";

const pageNameMap: any = {
  user: {
    fetchUrl: "/user/get-list",
    mutationNames: ["changeUserList", "changeUserTotal"],
    reload: true
  },
  role: {
    fetchUrl: "/role/get-list",
    mutationNames: ["changeRoleList", "changeRoleTotal"],
    reload: true
  },
  department: {
    fetchUrl: "/department/get-list",
    mutationNames: ["changeDepartmentList", "changeDepartmentTotal"],
    reload: true
  },
  menu: {
    fetchUrl: "/menu/get-menu-tree",
    mutationNames: ["changeMenuList", "changeMenuTotal"],
    reload: true
  },
  permission: {
    fetchUrl: "/permission/get-list",
    mutationNames: ["changePermissionList", "changePermissionTotal"],
    reload: true
  },
  goods: {
    fetchUrl: "/goods/get-list",
    mutationNames: ["changeGoodsList", "changeGoodsTotal"],
    reload: false
  },
  story: {
    fetchUrl: "/story/get-list",
    mutationNames: ["changeStoryList", "changeStoryTotal"],
    reload: false
  }
};

const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      queryInfo: {},
      userList: [],
      userTotalCount: 0,
      roleList: [],
      roleTotalCount: 0,
      menuList: [],
      menuTotalCount: 0,
      goodsList: [],
      goodsTotalCount: 0,
      departmentList: [],
      departmentTotalCount: 0,
      permissionList: [],
      permissionTotalCount: 0,
      storyList: [],
      storyTotalCount: 0
    };
  },

  mutations: {
    changeQueryInfo(state, queryInfo) {
      const [startTime = "", endTime = ""] = queryInfo.dateTime ?? [];
      queryInfo = { ...queryInfo, startTime, endTime } as any;
      delete queryInfo.dateTime;
      state.queryInfo = queryInfo;
    },
    changeUserList(state, list: IUserList) {
      state.userList = list;
    },
    changeUserTotal(state, total) {
      state.userTotalCount = total;
    },
    changeRoleList(state, list: IRoleList) {
      state.roleList = list;
    },
    changeRoleTotal(state, total) {
      state.roleTotalCount = total;
    },
    changeDepartmentList(state, list: IUserMenusResult) {
      state.departmentList = list;
    },
    changeDepartmentTotal(state, total) {
      state.departmentTotalCount = total;
    },
    changeMenuList(state, list: IUserMenusResult) {
      state.menuList = list;
    },
    changeMenuTotal(state, total) {
      state.menuTotalCount = total ?? 0;
    },
    changePermissionList(state, list) {
      state.permissionList = list;
    },
    changePermissionTotal(state, total) {
      state.permissionTotalCount = total;
    },
    changeGoodsList(state, list: IGoodsList) {
      state.goodsList = list;
    },
    changeGoodsTotal(state, total) {
      state.goodsTotalCount = total;
    },
    changeStoryList(state, list: IStoryList) {
      state.storyList = list;
    },
    changeStoryTotal(state, total) {
      state.storyTotalCount = total;
    }
  },

  actions: {
    async getPageListAction(
      ctx,
      payload: {
        pageName: string;
        queryInfo: any;
        success?: (result: any) => any;
        fail?: (error: any) => any;
      }
    ) {
      const { pageName, queryInfo, success, fail } = payload;
      try {
        const result = await getPageList(
          pageNameMap[pageName].fetchUrl,
          queryInfo
        );
        if (result && result.code === 0) {
          ctx.commit(pageNameMap[pageName].mutationNames[0], result.list);
          ctx.commit(pageNameMap[pageName].mutationNames[1], result.totalCount);
        } else {
          message.error(result.message);
          ctx.commit(pageNameMap[pageName].mutationNames[0], []);
          ctx.commit(pageNameMap[pageName].mutationNames[1], 0);
        }
        success && success(result);
        // console.log(result);
      } catch (error) {
        fail && fail(error);
        message.error("请求列表出错！");
        console.log("请求列表出错！", error);
      }
    },

    async removePageDataAction(
      ctx,
      payload: { pageName: string; wid: string; queryInfo: any }
    ) {
      try {
        const { pageName, wid, queryInfo } = payload;
        const url = `${pageName}/delete`;
        const result = await removePageData(url, wid);
        if (result && result.code === 0) {
          message.success(result.message);
          ctx.dispatch("getPageListAction", {
            pageName,
            queryInfo: queryInfo ? queryInfo : ctx.state.queryInfo
          });
          // pageNameMap[pageName].reload &&
          //   setTimeout(() => {
          //     location.reload();
          //   }, 3000);
        } else {
          message.error(result.message);
        }
      } catch (error) {
        console.log(error, "删除数据失败！");
      }
    },

    async createPageDataAction(
      ctx,
      payload: { pageName: string; params: any }
    ) {
      return new Promise(async (resolve) => {
        const { pageName, params } = payload;
        if ("password" in params) {
          params.password = crypto.encrypt(params.password);
        }
        const url = `${pageName}/create`;
        try {
          const result = await createPageData(url, params);
          if (result && result.code === 0) {
            message.success(result.message);
            ctx.dispatch("getPageListAction", {
              pageName,
              queryInfo: { ...ctx.state.queryInfo, pageSize: 10, pageNum: 1 }
            });
            resolve("success");
          } else {
            message.error(result.message);
            resolve("fail");
          }
        } catch (error) {
          console.log("创建数据失败！");
          resolve("fail");
        }
      });
    },

    async editPageDataAction(ctx, payload: { pageName: string; params: any }) {
      return new Promise(async (resolve) => {
        const { pageName, params } = payload;
        const url = `${pageName}/update`;
        try {
          const result = await createPageData(url, params);
          if (result && result.code === 0) {
            message.success(result.message);
            ctx.dispatch("getPageListAction", {
              pageName,
              queryInfo: { ...ctx.state.queryInfo, pageSize: 10, pageNum: 1 }
            });
            // 刷新页面
            // pageNameMap[pageName].reload &&
            //   setTimeout(() => {
            //     location.reload();
            //   }, 3000);
            resolve("success");
          } else {
            message.error(result.message);
            resolve("fail");
          }
        } catch (error) {
          console.log("更新数据失败！");
          resolve("fail");
        }
      });
    }
  },

  getters: {
    getDataList: (state) => {
      return (pageName: string) => (state as any)[`${pageName}List`];
    },
    getDataCount: (state) => {
      return (pageName: string) => (state as any)[`${pageName}TotalCount`];
    }
  }
};

export default systemModule;
