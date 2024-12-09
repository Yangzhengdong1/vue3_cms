const department = () =>
  import("@/views/main/system/department/department.vue");

export default {
  path: "/main/system/department",
  title: "部门管理",
  name: "department",
  component: department,
  children: []
};
