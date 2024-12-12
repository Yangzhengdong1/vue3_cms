import { App } from "vue";

import registerElement from "./register-element";
import registerProperties from "./register-properties";
import { verifyPermitDirective } from "./register-directive";
export * from "./register-directive";

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

  app.use(registerProperties);
  app.use(verifyPermitDirective);
}
