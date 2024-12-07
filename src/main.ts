import { createApp } from "vue";

import "normalize.css";
import "element-plus/theme-chalk/base.css";
import "element-plus/dist/index.css";

import App from "./App.vue";

import router from "./router";
import store, { setupStore } from "./store";
import { globalRegister } from "./global";

const app = createApp(App);

async function initRoute() {
  // 初始化 vuex 中的数据
  await setupStore();

  app.use(router).mount("#app");
}

app.use(store);
app.use(globalRegister);

// 解决动态路由刷新后无法匹配对应路径的问题
initRoute();
