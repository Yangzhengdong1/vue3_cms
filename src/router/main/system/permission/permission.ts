const permission = () =>
  import("@/views/main/system/permission/permission.vue");

export default {
  path: "/main/system/permission",
  name: "permission",
  component: permission,
  children: []
};
