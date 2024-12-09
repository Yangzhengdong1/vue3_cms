import type { App } from "vue";

import message from "@/utils/message";

export default (app: App) => {
  // 挂载全局属性
  app.config.globalProperties.$message = message;
};
