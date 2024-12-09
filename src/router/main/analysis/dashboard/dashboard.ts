const dashboard = () => import("@/views/main/analysis/dashboard/dashboard.vue");

export default {
  path: "/main/analysis/dashboard",
  title: "仪表盘",
  name: "dashboard",
  component: dashboard,
  children: []
};
