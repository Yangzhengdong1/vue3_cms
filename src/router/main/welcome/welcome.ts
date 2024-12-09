const welcome = () => import("@/views/main/welcome/welcome.vue");

export default {
  path: "/main/welcome",
  title: "welcome",
  name: "welcome",
  component: welcome,
  children: []
};
