import type { Module } from "vuex";

import type { IRootState, ISystemState } from "@/store/types";
import type { IUserList, IGoodsList } from "@/service/types/system";
import { getPageList } from "@/service/main/system/system.service";

const pageNameMap: any = {
  user: {
    fetchUrl: "/user/get-list",
    mutationNames: ["changeUserList", "changeUserTotal"]
  },
  department: {
    fetchUrl: "/department/get-tree-list",
    mutationNames: ["changeDepartmentList", "changeDepartmentTotal"]
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
        }
        console.log(result);
      } catch (error) {
        console.log("请求用户列表出错！", error);
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
