import { App } from "vue";

import registerElement from "./register-element";

export function registerApp(app: App): void {
  registerElement(app);
}

// 插件方式注册
export function globalRegister(app: App): void {
  // app.use(registerElement);
  app.use({
    install(app) {
      app.use(registerElement);
    }
  });
}
