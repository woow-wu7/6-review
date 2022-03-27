const path = require("path");
const {
  EntryOptionPlugin,
  AfterPlugin,
  RunPlugin,
  CompilePlugin,
  AfterCompilePlugin,
  EmitPlugin,
  DonePlugin,
} = require("../plugins/index.js.js");

module.exports = {
  mode: "development",
  entry: "./review.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          path.resolve(__dirname, "loaders", "style-loader"),
          path.resolve(__dirname, "loaders", "less-loader"),
        ],
      },
    ],
  },
  plugins: [
    new EntryOptionPlugin(),
    new AfterPlugin(),
    new RunPlugin(),
    new CompilePlugin(),
    new AfterCompilePlugin(),
    new EmitPlugin(),
    new DonePlugin(),
  ],
};
