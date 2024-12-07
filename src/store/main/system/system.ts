import type { Module } from "vuex";

import type { IRootState, ISystemState } from "@/store/types";
import type { IUserList } from "@/service/types/system";
import { getPageList } from "@/service/main/system/system.service";

const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      list: [],
      totalCount: 0
    };
  },

  mutations: {
    changeUserList(state, list: IUserList) {
      state.list = list;
    },
    changeUserTotal(state, total) {
      state.totalCount = total;
    }
  },

  actions: {
    async getPageListAction(ctx, payload: { url: string; queryInfo: any }) {
      const { url, queryInfo } = payload;
      try {
        const result = await getPageList(url, queryInfo);
        if (result && result.code === 0) {
          ctx.commit("changeUserList", result.list);
          ctx.commit("changeUserTotal", result.totalCount);
        }
        console.log(result);
      } catch (error) {
        console.log("请求用户列表出错！");
      }
    }
  }
};

export default systemModule;
