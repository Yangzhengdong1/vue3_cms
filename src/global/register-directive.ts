import { App } from "vue";

import store from "@/store";
import message from "@/utils/message";

export const verifyPermitDirective = (app: App) => {
  app.directive("cms-permit-directive", {
    mounted(el, binding) {
      const permitDirectiveData = binding.value;
      if (
        Array.isArray(permitDirectiveData) &&
        permitDirectiveData.length > 0
      ) {
        permitDirectiveData.forEach((eventItem) => {
          if (
            Object.hasOwnProperty.call(eventItem, "event") &&
            Object.hasOwnProperty.call(eventItem, "directive") &&
            Object.hasOwnProperty.call(eventItem, "handler")
          ) {
            const permissions: string[] = (store as any).state.login
              .userPermissions;

            // 接管元素的事件监听
            el.addEventListener(eventItem.event, () => {
              if (permissions.includes(eventItem.directive)) {
                eventItem.handler();
              } else {
                message.error("暂无权限！");
              }
            });
          }
        });
      }
    }
  });
};
