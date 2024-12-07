import type { RouteRecordRaw } from "vue-router";
import { IMenusChildren } from "@/service/types/login";

export let firstMenu: IMenusChildren | null = null;

const mapMenusToRoutes = (userMenus: IMenusChildren[]) => {
  const routes: RouteRecordRaw[] = [];
  // 1、先加载所有的 routes
  const allRoutes: RouteRecordRaw[] = [];

  // webpack 提供的函数，true：递归查找文件，如果为 false 只会查找 router/main 下的文件，子文件夹中不查找
  const routeFiles = require.context("../router/main", true, /\.ts/);
  const filePaths = routeFiles.keys();
  filePaths.forEach((filePath) => {
    const route = require("../router/main" + filePath.split(".")[1]);
    allRoutes.push(route.default);
  });

  // 2、根据菜单获取需要添加的routes
  const _recurseGetRoute = (menus: IMenusChildren[]) => {
    for (const menu of menus) {
      if (!menu.childrens.length) {
        const route = allRoutes.find((route) => route.path === menu.url);
        route && routes.push(route);
        if (!firstMenu) {
          firstMenu = menu;
        }
      } else {
        _recurseGetRoute(menu.childrens);
      }
    }
  };

  _recurseGetRoute(userMenus);

  return routes;
};
interface IBreadcrumbs {
  name: string;
  path?: string;
}
export const pathMapBreadcrumbs = (
  userMenus: IMenusChildren[],
  currentPath: string
) => {
  const breadcrumbs: IBreadcrumbs[] = [];
  pathMapToMenus(userMenus, currentPath, breadcrumbs);

  return breadcrumbs;
};

export const pathMapToMenus = (
  userMenus: IMenusChildren[],
  currentPath: string,
  breadcrumbs?: IBreadcrumbs[]
): IMenusChildren | undefined => {
  for (const menu of userMenus) {
    if (menu.childrens.length > 0) {
      const findMenu: IMenusChildren | undefined = pathMapToMenus(
        menu.childrens ?? [],
        currentPath
      );
      if (findMenu) {
        breadcrumbs?.push({ name: menu.name });
        breadcrumbs?.push({ name: findMenu.name, path: findMenu.url });
        return findMenu;
      }
    } else if (menu.childrens.length <= 0 && menu.url === currentPath) {
      breadcrumbs?.push({ name: menu.name });
      return menu;
    }
  }
};

export default mapMenusToRoutes;
