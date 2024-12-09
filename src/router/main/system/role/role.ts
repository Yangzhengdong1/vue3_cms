const role = () => import("@/views/main/system/role/role.vue");

export default {
  path: "/main/system/role",
  title: "角色管理",
  name: "role",
  component: role,
  children: []
};
