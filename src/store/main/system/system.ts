import type { Module } from "vuex";

import type { IRootState, ISystemState } from "@/store/types";
import type { IUserList, IGoodsList, IRoleList } from "@/service/types/system";
import { getPageList } from "@/service/main/system/system.service";
import { IUserMenusResult } from "@/service/types/login";
import message from "@/utils/message";

const pageNameMap: any = {
  user: {
    fetchUrl: "/user/get-list",
    mutationNames: ["changeUserList", "changeUserTotal"]
  },
  role: {
    fetchUrl: "/role/get-list",
    mutationNames: ["changeRoleList", "changeRoleTotal"]
  },
  department: {
    fetchUrl: "/department/get-tree-list",
    mutationNames: ["changeDepartmentList", "changeDepartmentTotal"]
  },
  menu: {
    fetchUrl: "/menu/get-menu-tree",
    mutationNames: ["changeMenuList", "changeMenuTotal"]
  },
  goods: {
    fetchUrl: "/goods/get-list",
    mutationNames: ["changeGoodsList", "changeGoodsTotal"]
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
      goodsTotalCount: 0
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
    changeMenuList(state, list: IUserMenusResult) {
      state.menuList = list;
    },
    changeMenuTotal(state, total) {
      state.menuTotalCount = total ?? 0;
    },
    changeGoodsList(state, list: IGoodsList) {
      state.goodsList = list;
    },
    changeGoodsTotal(state, total) {
      state.goodsTotalCount = total;
    }
  },

  actions: {
    async getPageListAction(
      ctx,
      payload: { pageName: string; queryInfo: any }
    ) {
      const { pageName, queryInfo } = payload;
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
        // console.log(result);
      } catch (error) {
        message.error("请求列表出错！");
        console.log("请求列表出错！", error);
      }
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
