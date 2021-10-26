const merge = require("webpack-merge"); // --------------- webpack-merge
const dev = require("./webpack5.config.dev.js"); // ------- 加载dev环境的配置

// webpack-merge 合并配置
module.exports = merge(dev, {
  mode: "development",
  devServer: {
    contentBase: "./dist",
    port: 8000,
    open: true,
    compress: true,
  },
});
