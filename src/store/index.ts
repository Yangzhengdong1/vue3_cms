import { createStore, useStore as useVuexStore } from "vuex";

import { IRootState, IStoreType } from "@/store/types";
import login from "@/store/login/login";
import system from "@/store/main/system/system";

const store = createStore<IRootState>({
  state: () => {
    return {
      name: "张三"
    };
  },
  modules: {
    login,
    system
  }
});

export const setupStore = async () => {
  console.log("loadLocalLogin");
  await store.dispatch("login/loadLocalLogin");
};

// export function useStore(): Store<IStoreType> {
//   return useVuexStore();
// }

export const useStore = () => {
  return useVuexStore<IStoreType>();
};

export default store;
