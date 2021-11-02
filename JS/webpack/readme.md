// 复习webpack的优化，看自己能想起来多少

# noParse
- 设置：在 module 中设置 noParse，表示不去解析模块的依赖关系
- 使用场景：如果第三方依赖没有在依赖别的包时，可以使用noParse不去解析第三方包的依赖关系，提升打包速度
- 语法：
  - noParse是一个正则
```
module: {
  noParse: /jquery|lodash/, // 因为jquery和lodash都没有依赖别的库
}
```

# include 和 exclude
- 设置：在module.rules中每一个配置对象中，在用不同的loader去解析文件时，可以通过include和exclude来缩小匹配的范围
- 比如：一般情况需要使用loader解析的文件都是业务开发的文件，而不需要在用loader去打包第三方的库，此时可以使用 include 和 exclude
```
module: {
  rules: [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'babel-loader'
        }
      ]
    }
  ]
}
```

# webpack.IgnorePlugin
- 使用场景：
  - 当一个第三方库中引入了一个文件夹，但是里面有很多文件的时候，我们在业务中却只使用到了一个文件时，就可以使用 webpack.IgnorePlugin 将引入的文件夹忽略掉
  - 然后手动的去引入其中的一个文件，从而减少打包的文件大小，提升打包速度
```
plugins: [
  new webpack.IgnorePlugin({
    /\.\/local/, 'moment'
  })
]
然后在业务中手动引入
require('moment/local/zh-cn')
```

# 动态链接库
- webpack.DllPlugin
- webpack.DllReferencePlugin
- 使用场景：
  - 因为：比如不需要改动的第三方库react和react-dom，每当业务代码修改从新打包时，也会从新打包react和react-dom，
  - 但是：这两个库是没有修改过的，所以我们可以单独打包react和react-dom，每次修改代码后，都是直接引入打包好的react和react-dom，提升打包速度
  - 技术：
    - webpack.DllPlugin 单独打包react和react-dom生成 manifest.json 文件，即动态链接库
    - webpack.DllReferencePlugin 引入动态连结库，如果有就引用，没有就从新打包
    - 还要在模版html中引入打包好的库文件

# 抽离公共代码
- 使用场景
  - 比如两个入口文件都使用到了a和b模块，此时就可以把a和b单独打包出来
  - optimization > splitChunks > cacheGroups > common/vender


# happypack
- 多线程打包

# tree-shaking
- import时，没有使用到的文件中的方法或者变量不会被打包

# 懒加载
- import().then(res => res.default.变量名)