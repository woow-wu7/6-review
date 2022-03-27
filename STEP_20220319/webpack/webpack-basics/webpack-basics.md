# (一) webpack 性能优化

### (1) noParse

- module.noParse
  - 作用：不去解析 ( 该模块 ) 的 ( 依赖关系 )，提高构建速度，前提是知道该模块没有依赖其他的模块
  - 类型：后面接的是一个 ( 正则 )
  - 比如：module: { noParse: /jquery|lodash/, rules: [{test, use}]}
- 案例
  - lodash 和 jquery 都没有依赖其他的模块

```
module: {
  noParse: /jquery|lodash/,
  // 不去解析jquery或lodash的依赖关系，因为它们俩都没有依赖其他库，从而提高构建速度
  rules: []
}
```

### (2) include 和 exclude

- 配置
  - module.rules[number].include 或者 module.rules[number].exclude 来缩小 ( loader 匹配文件的范围 )
- loader 寻找匹配文件的过程
  - 因为：默认 ( 现在 node_modules )，然而大多数情况是我们 ( 业务组件 ) 需要用 loader 来处理
  - 所以：可以通过 include 和 exclude 来做范围的控制

```
module: {
  noParse: /xxxx/,
  rules: [
    {
      test: /\.js$/,
      exclude: /node_modules/, // 表示不去匹配 node_modules 中的 js 文件
      use: {
        loader: 'babel-loader'
      }
    }
  ]
}
```

### (3) webpack.ignorePlugin

- 作用
  - 忽略引入的这个 ( 库中引入的文件 )
  - 忽略后，则可以自己手动引入该库需要在本项目中用到的一些文件，从而减少包的大小

### (4) **DllPlugin 和 DllReferencePlugin**

- 动态连接库
  - DllPlugin
    - 作用：单独打包第三方包时，生成一个 json 任务清单
  - DllReferencePlugin
    - 作用：引用动态链接库
- 总结
  - 原理：比如我们项目中要使用 react 和 reactDOM，我们就可以把他们 ( 单独打包成一个文件 )，当我们 ( 修改业务组件时 ) 重新打包时候，就不需要再重新打包 react 和 reactDOM，而是 ( 直接引用之前打包好的 react 和 reactDOM )
  - 效果：提升了每次打包的打包速度
  - 实现：利用 ( 动态链接库 ) 来实现

### (5) happyPack

- 作用：开启多线程打包
- 分类
  - 可以对 js 类型的资源开启多线程打包
  - 同时对 css 类型的资源开启多线程打包

### (6) webpack 自带的一些优化

- tree-shaking
  - 一个要用在 ( import ) 语法中，会自动清除掉 ( import 的模块中没有使用到的代码 )
- scope-host
  - webpack 会自动省略一些可以优化的代码
  - 比如：在声明多个变量相加时，会合并变量

### (二) cross-env 和 webpack.DefinePlugin 和 mode 的区别

- cross-env -----------------> 指定 ( node ) 环境中的 环境变量 ------> 即 ( webpack.config.js ) 文件中的环境变量
- webpack.DefinePlugin() ----> 指定 ( 浏览器 ) 环境中的 环境变量 -----> 即 ( 各个 module 模块 js ) 文件中的环境变量
- mode ----------------------> 指定 ( 浏览器 ) 环境中的 环境变量
- 相等
  - ( mode: 'development' ) 相当于 ( webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify('development')}) )
- 如何同步 浏览器环境 和 node 环境中的环境变量
  - 答案：mode: process.env.NODE_ENV
  - 原理：( cross-env NODE_ENV=aaa ) => 那么这里的 ( process.env.NODE_ENV=aaa ) => 推出 ( mode=aaa ) => ( webpack.DefinePLugin({'process.env.NODE_ENV': JSON.stringify(aaa)}) ) => ( 在浏览器环境中的 process.env.NODE_ENV=aaa )
- 源码
  - 源码地址：https://github.com/woow-wu7/8-divine/blob/main/examples/main.js
  - 源码地址 2: https://github.com/woow-wu7/7-compiler/blob/main/webpack.config.js

### (三) hash chunk-hash content-hash 之间的区别

- hash
  - 作用：只要项目中有文件修改，整个项目构建的 hash 都会改变，并且全部文件都共用相同的 hash
  - 弊端：如果只修改了一个文件，整个文件的缓存都将失效，因为真个文件的 hash 都改变了
- chunkhash
  - 相对于 hash，chunkhash 的影响范围较小
  - 原理：
    - 根据不同的入口文件(Entry)进行依赖文件解析、构建对应的 chunk，生成对应的哈希值
    - 不同入口打包生成的 chunk 的 hash 不一样
  - 测试
    - 请使用 cnpm run build 进行 chunkhash 的测试，main 和 other 的 js 文件的 hash 值就不一样
  - 例子：
    - 策略：比如一个项目有 6 个组件，123 打包为一个 thunk1 输出一组 js/css，456 打包为另一个 thunk2 输出另一组 js/css
    - 结果： 如果使用 chunkhash，打包完成后 chunk1 的 hash 和 chunk2 的 hash 就不一样，改动了 123，456 的 chunk2 的 hash 就不会变，缓存仍然有效
- contenthash
  - 1. 影响范围最小，在 hash，chunkhash，contenthash 三者中
  - 2. 遇到问题
    - 使用 chunkhash，如果 index.css 被 index.js 引用了，那么 ( css 文件和 js 文件 ) 就会 ( 共用相同的 chunkhash 值 )
    - 如果 index.js 更改了代码，css 文件就算内容没有任何改变，由于是该模块发生了改变，导致 css 文件会重复构建
  - 3. 解决方法
    - 使用 ( mini-css-extract-plugin ) 里的 ( contenthash ) 值，保证即使 css 文件所处的模块里就算其他文件内容改变，只要 css 文件内容不变，那么不会重复构建
- 总结
  - hash(任何一个文件修改，整个打包所有文件的 hash 都会改变)： - 是根据整个项目构建，要项目里有文件更改，整个项目构建的 hash 值都会更改，并且全部文件都共用相同的 hash 值
  - chunkhash(只影响到不同 entry 划分的 chunk)：chunkhash 根据不同的入口文件(Entry)进行依赖文件解析、构建对应的代码块（chunk），生成对应的哈希值，某文件变化时只有该文件对应代码块（chunk）的 hash 会变化
  - contentHash(即使是相同 chunk 的 js 和 css，改动 js 只会影响对应的 js 而不会影响到 css)：每一个代码块（chunk）中的 js 和 css 输出文件都会独立生成一个 hash，当某一个代码块（chunk）中的 js 源文件被修改时，只有该代码块（chunk）输出的 js 文件的 hash 会发生变化
  - 换种说法
    - 1. hash 任何一个文件修改，整体的 hash 都会变化
    - 2. thunk-hash 通过不同 entry 打包成不同的 chunk，不同 chunk 文件的修改不会相互影响，只会影响相同名的 chunk 的所有内容
    - 3. content-hash，即使是相同名的 chunk，但是资源类型不一样，在未修改时也不会变
- 使用
  - 在哪些地方可以使用到 hash chunkhash contenthash
  - 凡是在 webpack.config.js 中具有 ( filename ) 属性的地方都可以使用 ( 占位符的方式 [hash] ) 使用到这几种 hash
