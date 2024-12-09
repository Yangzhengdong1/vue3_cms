const user = () => import("@/views/main/system/user/user.vue");

export default {
  path: "/main/system/user",
  title: "用户管理",
  name: "user",
  component: user,
  children: []
};
