const category = () => import("@/views/main/product/category/category.vue");

export default {
  path: "/main/product/category",
  title: "商品分类",
  name: "category",
  component: category,
  children: []
};
