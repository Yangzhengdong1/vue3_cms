import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import { useStore } from "vuex";

const Login = () => import("@/views/login/login.vue");
const Main = () => import("@/views/main/main.vue");
const About = () => import("@/views/about/about.vue");
const NotFound = () => import("@/views/not-found/not-found.vue");

import { firstMenu } from "@/utils/map-menus";
import localCache from "@/utils/local-cache";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/main"
  },
  {
    path: "/main",
    component: Main,
    name: "main"
    // redirect: "/main/welcome",
    // children: [welcome]
  },

  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/about",
    name: "about",
    component: About
  },
  {
    path: "/:pathMatch(.*)*",
    component: NotFound
  }
];

const router = createRouter({
  routes,
  history: createWebHistory()
});

router.beforeEach((to) => {
  const token = localCache.getCache("token", "local");
  if (!token && to.path !== "/login") {
    return "/login";
  }
  if (token && to.path === "/login") {
    router.back();
  }

  // 将 main 重定向为 userMenus 第一位
  if (to.path === "/main") {
    return firstMenu?.url;
  }

  let title = "";
  if (to.path === "/login") {
    title = "登录";
  } else if (to.path === "/about") {
    title = "个人资料";
  } else {
    const store = useStore();
    store.dispatch("login/getCurrentUserMenu", to.path);
    title = store.state.login.currentMenu?.name ?? "not-found";
  }

  document.title = title;
});

export default router;
