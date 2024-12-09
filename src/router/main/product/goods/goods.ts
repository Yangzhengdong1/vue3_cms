const goods = () => import("@/views/main/product/goods/goods.vue");

export default {
  path: "/main/product/goods",
  title: "商品列表",
  name: "goods",
  component: goods,
  children: []
};
