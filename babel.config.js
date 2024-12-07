module.exports = {
  presets: ["@vue/cli-plugin-babel/preset"],
  plugins: [
    [
      "import",
      {
        libraryName: "element-plus",
        customName: (name) => {
          // 按照组件名导入相应的组件文件
          return `element-plus/es/components/${name.slice(3)}/index.mjs`; // 从 `el-` 开始的组件名去掉 `el-`，找到相应组件文件
        },
        customStyleName: (name) => `element-plus/theme-chalk/${name}.css`
      }
    ]
  ]
};
