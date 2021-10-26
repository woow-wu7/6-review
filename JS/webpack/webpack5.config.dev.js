const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

// webpack5

// (一)
/**
 * 1
 * webpack5升级后配置出现的问题
 * BREAKING CHANGE: webpack < 5 used to include polyfills for node.js core modules by default.
 * This is no longer the case. Verify if you need this module and configure a polyfill for it.
 * 突破性更改：默认情况下，webpack<5默认包含node.js核心模块的polyfills，现在已经不是这样了。验证你是否需要此模块并为其配置polyfill
 *
 * If you want to include a polyfill, you need to:
    - add a fallback 'resolve.fallback: { "path": require.resolve("path-browserify") }'
    - install 'path-browserify'
   If you don't want to include a polyfill, you can use an empty module like this:
    - resolve.fallback: { "path": false }
 * 结论：
 * - 上面两个if表示：polyfill是在 resolve.fallback 中添加的
 * - 具体是：resolve.fallback.path 来配置 path
 */

/**
 * 2
 * webpack指定配置文件的命令
 * webpack --config webpack5.config.js --mode development
 * 1. --config xxxx 用来指定webpack的配置文件
 * 2. --mode development|production 用来指定webpack的模式
 */

/**
 * 3
 * webpack-dev-server
 * 配置
 *  - 在 `webpack.config.js` 中通过 `devServer` 字段来配置
 *  - contentBase: 比较重要的属性是 `contentBase：表示启动服务，需要加载的静态资源`
 * 启动server命令
 *  - 可以在 package.json 的 scripts 中来配置
 *  - 比如：dev: webpack-dev-server
 */

/**
 * 4
 * html-webpack-plugin
 * 配置
 *  - 是作为 ( 插件-plugins ) 在webpack.config.js 中配置的
 *  - new HtmlWebpackPlugin({template,filename})
 *    - template: 表示指定需要作为template模版的html文件，一般是要自己写好一个html的template模版，打包后将生成一个一样的模版，同时引入打包好的其他资源，脚本等文件
 *    - filename: 表示的是 ( 根据templateHtml文件打包后，生成文件的名字 )
 * 打包多页应用
 *  - 需要配合的属性有
 *    - entry: 设置为一个对象，每个key都可以指定一个入口文件，则表示可以打包多入口
 *    - output: ( output ) 的 ( filename ) 使用 ( 占位符 )，这样打包的多个入口，就会输出多个出口文件
 *    - html-webpack-plugin
 *      - 通过多次 new HtmlWebpackPlugin
 *      - template: template属性用来指定templateHtml文件需要引用的 ( 不同模版文件 )
 *      - chunks: chunks属性是 ( 一个数组 )，用来指定该html文件需要引用的js文件，数组中的成员值是 ( entry对象中指定的key )
 */

/**
 * 5
 * clean-webpack-plugin
 * 作用：用来删除打包后产生的文件夹
 * 默认：默认每次打包都会删除
 * 安装：npm install --save-dev clean-webpack-plugin
 * 使用：
 *  - const { CleanWebpackPlugin } = require("clean-webpack-plugin")
 *  - 在 plugins 配置数组中，new CleanWebpackPlugin()
 */

/**
 * 6
 * webpack.DefinePlugin
 * 作用：定义 ( 环境变量 )，即创建一个在 ( 编译时 - 可以全局配置的常量 )
 * 使用：
 *  - 先引入webpack ----> const webpack = require("webpack");
 *  - 再在plugins中 ----> new webpack.DefinePlugin({}) 来指定对应的key，作为环境变量
 * 注意点：
 *  - 如果 ( 环境变量的值是 - 字符串类型 ) 是需要用 ( JSON.stringify() ) 转一遍的，这样才会传入什么值，就返回什么值，否则会报错变量找不到
 *  - 基本上：所以数据可以用JSON.stringify()来操作，传入什么类型就返回什么类型
 * cross-env 和 webpack.DefinePlugin 的区别？
 *  - cross-env：运行时-定义环境变量
 *  - webpack.DefinePlugin: 编译时-定义环境变量
 */

/**
 * 7
 * css-loader style-loader less-loader
 * 安装
 * - npm install style-loader css-loader less less-loader -D
 * 不同作用
 * - css-loader
 *  - 主要用于支持 @import 语法的css引入
 * - style-loader
 *  - 主要作用是把css以 ( style标签的 ) 形式嵌入到html的head标签中
 *  - 注意顺序是：先css-loader处理完css后，再style-loader插入到head标签中
 *  - 配置项 options
 *    - insert: 'body' 将style标签插入到body标签中，默认是插入到head标签中
 * 执行顺序
 *  - 因为：loader加载顺序：( 从右往左，从下往上 )
 *  - 所以：先css-loader 在style-loader
 */

/**
 * 8
 * mini-css-extra-plugin
 * 安装
 *  - npm install mini-css-extract-plugin -D
 * 需求
 *  - 默认是style，插入head -------> style-loader是把css文件转换成 style 标签内嵌在html的head标签中，
 *  - 单独抽离，link引入 ---------> 我们希望的是用 link 标签外部引入css，所以用mini-css-extract-plugin来抽离css，通过link标签把css引入html
 * 使用
 *  - 引入：const MiniCssExtractPlugin =  require('mini-css-extract-plugin')
 *  - 使用：MiniCssExtractPlugin.loader 放在 style-loader 和 css-loading 前面
 *  - plugins：在 plugins 通过 new MiniCssExtractPlugin() 来指定 ( 单独打包的文件夹和文件 )
 */

/**
 * 9
 * postcss-loader 和 autoprefixer
 * postcss-loader
 *  - 作用：
 *    - 解决浏览器前缀问题，不同浏览器在不同的css属性需要添加不同的前缀，所有需要通过这两个依赖来解决各个浏览器的冲突
 *    - 1. 需要单独的配置文件：postcss.config.js
 *    - 2. 需要配合插件 autoprefixer
 * autoprefixer
 *  - autoprefixer需要给出浏览器的一些信息，所以要在 package.json 中添加 browserslist 配置
 */

/**
 * 10
 * 图片相关的 file-loader url-loader
 * 安装
 *  - npm install file-loader url-loader html-withimg-loader -D
 * file-loader
 *  - 会生成一张图片到build的目录下，并将图片的名称返回回来
 * url-loader
 *  - 可以设置大小限制，小于时，url-loader会将图片转成base64，大于时，使用file-loader加载图片
 *  - 在options: {limit: 200 * 1024}来设置，200k，通过 ( limit ) 来设置
 *  - options: {outputPath: 'img/'} ----- 将图片打包到img文件夹下
 *  - 注意：
 *    - (1)css所有文件单独抽离成一个文件放到一个文件夹中是使用 mini-css-extract-plugin
 *    - (2) 图片单独抽离到文件夹中是url-loader中配置options的outputPath
 */

/**
 * 11
 * devtool
 * sourcemap
 * - devtool: 'source-map' // 显示行数，产生map文件
 * - devtool: 'eval-source-map' // 显示行数，不产生map文件
 */

/**
 * 12
 * copy-webpack-plugin
 * 安装
 * npm install copy-webpack-plugin -D
 * 使用
 * - const CopyWebpackPlugin = require('copy-webpack-plugin')
 * - new CopyWebpackPlugin({ patterns: [{from,to}] }),
 */

/**
 * 13
 * banner-plugin
 * 作用：webpack自带的plugin，用于在js文件开头注释一些说明内容
 */

/**
 * 14
 * resolve
 * 别名
 * - resolve.alias
 * 自动解析确定的扩展
 * - resolve.extensions
 */

/**
 * 15
 * webpack-merge
 * 作用
 * - 区分不同环境，合并不同环境的webpack配置
 * 安装
 * - npm install webpack-merge -D
 * 使用
 * - module.exports = merge(base, {})
 */

// (二)
// webpack中 ( hash ) 的分类
// - hash
// - chunkhash
// - contenthash
// - 影响范围从大到小：hash > chunkhash > contenthash (mini-css-extract-plugin)
/**
 * 1
 * hash
 * - 作用：只要项目中有文件修改，整个项目构建的hash都会改变，并且全部文件都共用相同的hash
 * - 弊端：如果只修改了一个文件，整个文件的缓存都将失效，因为真个文件的hash都改变了
 * 2
 * chunkhash
 * - 相对于hash，chunkhash的影响范围较小
 * - 原理：
 *    - 根据不同的入口文件(Entry)进行依赖文件解析、构建对应的chunk，生成对应的哈希值
 *    - 不同入口打包生成的chunk的hash不一样
 * - 测试
 *    - 请使用 cnpm run build 进行 chunkhash 的测试，main和other的js文件的hash值就不一样
 * - 例子
 *    - 策略：比如一个项目有6个组件，123打包为一个thunk1输出一组js/css，456打包为另一个thunk2输出另一组js/css
 *    - 结果：如果使用chunkhash，打包完成后chunk1的hash和chunk2的hash就不一样，改动了123，456的chunk2的hash就不会变，缓存仍然有效
 * 3
 * contenthash
 * - 影响范围最小，在hash，chunkhash，contenthash三者中
 * - 遇到问题
 *    - 使用chunkhash，如果index.css被index.js引用了，那么 ( css文件和js文件 ) 就会 ( 共用相同的chunkhash值 )
 *    - 如果index.js更改了代码，css文件就算内容没有任何改变，由于是该模块发生了改变，导致css文件会重复构建
 * - 解决方法
 *    - 使用 ( mini-css-extract-plugin ) 里的 ( contenthash ) 值，保证即使css文件所处的模块里就算其他文件内容改变，只要css文件内容不变，那么不会重复构建
 * 4
 * 在哪些地方可以使用到 hash chunkhash contenthash
 *  - 凡是在 webpack.config.js 中具有 ( filename ) 属性的地方都可以使用 ( 占位符的方式 [hash] ) 使用到这几种hash
 * 5
 * 总结
 *  - hash(任何一个文件修改，整个打包所有文件的hash都会改变)： - 是根据整个项目构建，要项目里有文件更改，整个项目构建的hash值都会更改，并且全部文件都共用相同的hash值
 *  - chunkhash(只影响到不同entry划分的chunk)：chunkhash根据不同的入口文件(Entry)进行依赖文件解析、构建对应的代码块（chunk），生成对应的哈希值，某文件变化时只有该文件对应代码块（chunk）的hash会变化
 *  - contentHash(即使是相同chunk的js和css，改动js只会影响对应的js而不会影响到css)：每一个代码块（chunk）中的js和css输出文件都会独立生成一个hash，当某一个代码块（chunk）中的js源文件被修改时，只有该代码块（chunk）输出的js文件的hash会发生变化
 */

// (三)
// 编写一个简单的loader
/**
 * 1
 * 什么是loader
 * - loader本质上就是一个 ( 函数 )，( 函数的第一个参数就是和loader匹配的文件的 - 源代码字符串 )
 * 特点
 * - 不能写成箭头函数，因为需要在函数中使用到 this，通过this来获取到更多的api
 * 2
 * this.query
 * - 如何获取loader中的配置参数：即options对象？
 *    - loader中存在options：this.query.options
 *    - loader中不存在options：如果 loader 中没有 options，而是以 query 字符串作为参数调用时，this.query 就是一个以 ? 开头的字符
 * - 废弃！
 *    - 注意：this.query已经废弃，使用 loader-utils 中的 getOptions 来获取 options 对象
 * 3
 * loader-utils
 *    - 是一个插件，需要安装
 *    - 安装：npm install loader-utils -D
 *    - 使用：通过loader-utils中的 getOptions 获取loader的options配置对象
 * 4
 * this.callback
 *  - 第一个参数：err // Error 或者 null
 *  - 第二个参数：content // string或者buffer，即处理过后的源代码
 *  - 第三个参数：sourceMap // 可选，必须是一个可以被这个模块解析的 source map
 *  - 第四个参数：meta //可选，即元数据
 * this.async
 *  - 处理loader中的异步操作
 *  - this.async()方法返回 this.callback
 *
 *
 *
 * 5
 * resolveLoader
 * 概念：resolveLoader 是 webpack 的配置项，可以直接在webpack.config.js配置文件中通过 resolveLoader 来配置
 *
 *
 *
 * 6 编写一个简单的loader
 * - 编写：replaceLoader -----> module.exports = function (source) { return source.replace("hello", "hi!")};
 * - 使用：在 module.rules 中通过 { test: /\.js$/, use: [path.resolve(__dirname, "./loader/replaceLoader.js")]} 来添加
 */

module.exports = {
  mode: "development",
  entry: {
    // 对象指定多入口
    home: "./JS/webpack/index.js",
    other: "./JS/webpack/index2.js",
  },
  output: {
    filename: "[name].[hash:8].js",
    // filename
    // 1. 占位符可以根据entry的key，打包成不同的文件
    // 2. chunkhash：这里使用的是 ( chunkhash )，不同入口entry在打包输出的文件的hash值是不同的
    // 3. hash：如果这里使用hash，多页面打包后生成的不同文件的hash是相同的
    path: path.resolve(__dirname, "build"), // 文件路径
  },
  resolve: {
    // resolve.fallback 是 webpack5 新增加的配置
    fallback: {
      path: require.resolve("path-browserify"), // path相关
    },
  },
  // resolveLoader: {
  //   // 配置解析loader的相关配置
  //   // 1. 除了在这里配置
  //   // 2. 还可以直接在 module.rules 中直接通过 ( use数组引入loader )
  //   modules: ["node_modules", path.resolve(__dirname, "./loader/")], // 表示在寻找loader时，先去 node_modules 中寻找，没有找到再在 "./loader" 中寻找
  //   // extensions: [".js", ".json"],
  //   // mainFields: ["loader", "main"],
  // },
  devServer: {
    // webpack-dev-server 的配置项
    // 1. 在这里配置后，要启动还要输入命令
    // 2. 可以在 package.json 中的 scripts 配置项中配置 `dev: webpack-dev-server`
    contentBase: path.join(__dirname, "build"), // 启动服务加载静态资源，这里表示加载 build 文件夹中的静态文件
    port: "7000", // 指定端口
    compress: true, // 开启 gzip 压缩
    open: true, // 在服务启动后，是否打开浏览器标签
    proxy: {
      "/api": {
        target: "http://yapi.wxb.com.cn", // 代理的目标地址
        pathRewrite: {
          // 路径重写
          "^/api": "", // remove path 相当于把 '/api' 用 '' 代替
        },
      },
    },
  },
  devtool: "source-map", // 显示行数，产生map文件
  module: {
    // 注意：这里不要写成 modules，不然会报错 webpack >= v2.0.0 no longer allows custom properties in configuration.
    rules: [
      // 加载自定义的 loader - replaceLoader
      {
        test: /\.js$/,
        use: [path.resolve(__dirname, "./loader/replaceLoader.js")],
      },
      // {
      //   test: /\.js$/,
      //   loader: "replace-loader", // -------------------- 加载replaceLoader，即文件名
      // },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader",
            // options: {
            //   insert: "body", // ----------------- style标签默认插入到header标签中，这里这样设置可以插入到body标签中
            // },
            // 注意：loader的顺序是 ( 从下往上，从右往左 )
            // 所以：先使用 "css-loader" 再使用 "style-loader"
            // 作用：
            // "css-loader" -----> @import
            // "style-loader" ---> 利用 ( style标签 )，插入css到 ( head标签 ) 中
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
          },
          {
            loader: "less-loader",
          },
        ],
      },
      {
        test: /\.(jpg|png|jpeg|gif)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 200 * 1024, // 小于200k转成base64, 大于200k使用file-loader来处理加载图片
              esModule: false, // 用于html-withimg-plugin生效
              outputPath: "img/", // 输出到 img 文件夹中
              publicPath: "", // 单独配置img的公共路径，而不是在output中全部配置
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./template.html"), // 模板html，采用的模版是当前文件夹中的template.html文件作为模版
      filename: "home.[hash].html", // 打包后的html的文件名
      hash: true, // html引用的js是否带有hash戳
      minify: {
        //  压缩优化
        removeAttributeQuotes: true, //  删除html标签属性值的双引号
        collapseWhitespace: true, //  折叠空行为一行
      },
      chunks: ["home"], // 多页面打包后，该html文件要引用的js文件，值是在entry对象中的key
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./template.html"),
      filename: "other.[hash].html", // 打包后的html的文件名
      chunks: ["other"],
    }),
    new CleanWebpackPlugin(), // ---------- 默认是删除 output.path 指定的文件夹
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "./toCopyConsume"), // 将 toCopyConsume 中的文件拷贝到 to中的文件夹中
          to: "./", // 将会拷贝到打包后的文件中的根目录，比如build文件夹
        },
      ],
    }),
    new webpack.DefinePlugin({
      AUTH: JSON.stringify("AUTH_NAME"), // --- 需要使用 JSON.stringify()
    }),
    new webpack.BannerPlugin({ banner: " by woow_wu7" }),
    new MiniCssExtractPlugin({
      // -------- 单独抽离css文件成为单独的文件夹，然后通过link标签引入
      filename: "only.css", // -------------------------------------------------------- 抽离出来的css文件名
    }),
  ],
};
