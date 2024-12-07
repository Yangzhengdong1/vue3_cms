const path = require("path");
const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: true,
  // 配置方式二：和 webpack 属性完全一致，最后会合并
  configureWebpack: {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
        commponents: "@/commponents"
      }
    },
    devServer: {
      // host: "0.0.0.0",
      port: 8080,

      client: {
        overlay: false
      },
      proxy: {
        "/httpProxy": {
          target: "http://192.168.31.58:8000",
          pathRewrite: {
            "^/httpProxy": ""
          },
          changeOrigin: true
        }
      }
    }
  }
});
