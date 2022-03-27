# webpack 性能优化

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
