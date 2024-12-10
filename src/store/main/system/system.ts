import type { Module } from "vuex";

import type { IRootState, ISystemState } from "@/store/types";
import type { IUserList } from "@/service/types/system";
import { getPageList } from "@/service/main/system/system.service";

const pageNameMap: any = {
  user: {
    url: "/user/get-list",
    mutationNames: ["changeUserList", "changeUserTotal"]
  }
};

const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      userList: [],
      userTotalCount: 0
    };
  },

  mutations: {
    changeUserList(state, list: IUserList) {
      state.userList = list;
    },
    changeUserTotal(state, total) {
      state.userTotalCount = total;
    }
  },

  actions: {
    async getPageListAction(
      ctx,
      payload: { pageName: string; queryInfo: any }
    ) {
      const { pageName, queryInfo } = payload;
      try {
        const result = await getPageList(pageNameMap[pageName].url, queryInfo);
        if (result && result.code === 0) {
          ctx.commit(pageNameMap[pageName].mutationNames[0], result.list);
          ctx.commit(pageNameMap[pageName].mutationNames[1], result.totalCount);
        }
        console.log(result);
      } catch (error) {
        console.log("请求用户列表出错！");
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
