import { createStore, useStore as useVuexStore } from "vuex";

import { IRootState, IStoreType } from "@/store/types";
import login from "@/store/login/login";
import system from "@/store/main/system/system";
import { getDictTable } from "@/service/main/system/system.service";
import message from "@/utils/message";

const tableNameMap: any = {
  DEPT_TREE: "changeIntegrityDepartment",
  ROLES: "changeIntegrityRole",
  LEVELS: "changeIntegrityLevel"
};

const store = createStore<IRootState>({
  state: () => {
    return {
      name: "张三",
      integrityRole: [],
      integrityDepartment: [],
      integrityLevel: []
    };
  },

  mutations: {
    changeIntegrityRole(state, list: any[]) {
      state.integrityRole = list;
    },
    changeIntegrityDepartment(state, list: any[]) {
      state.integrityDepartment = list;
    },
    changeIntegrityLevel(state, list: []) {
      state.integrityLevel = list;
    }
  },

  actions: {
    async getDictTableAction(ctx, tableName) {
      try {
        const result = await getDictTable(tableName);
        if (result && result.code === 0) {
          ctx.commit(tableNameMap[tableName], result.data);
        } else {
          message.error(result.message);
        }
      } catch (error) {
        console.log(error, "请求字典表出错！");
      }
    }
  },
  modules: {
    login,
    system
  }
});

export const setupStore = async () => {
  console.log("loadLocalLogin");
  await store.dispatch("login/loadLocalLogin");
  // 这里不会对菜单之类的造成影响，所以可以不必 await
  store.dispatch("getDictTableAction", "ROLES");
  store.dispatch("getDictTableAction", "DEPT_TREE");
  store.dispatch("getDictTableAction", "LEVELS");
};

// export function useStore(): Store<IStoreType> {
//   return useVuexStore();
// }

export const useStore = () => {
  return useVuexStore<IStoreType>();
};

export default store;
