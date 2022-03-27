# webpack 打包流程

## (一) 前置知识

### (1) babel AST 处理

- @babel/parse -------------- 将 源码字符串 转换成 AST 抽象语法树
- @babel/traverse ----------- 遍历 AST
- @babel/types -------------- 操作 AST，比如 添加，删除，修改等操作
- @babel/generator ---------- 将修改后的 AST 转成 源码字符串

### (2) webpack 生命周期钩子

- entryOption --------------- 在 webpack.config.js 中的 entry 处理后执行
- afterPlugins -------------- 在 Compiler.Constructor 中遍历执行完所有的 plugins 后，执行
- run ----------------------- run 方法调用时执行
- compiler ------------------ 打包前执行
- afterCompiler ------------- 打包后执行
- emit ---------------------- 写入 output 时执行
- done ---------------------- 打包完成后执行

### (3) loader 和 plugin 的执行时机

- plugin 的注册是在 Compiler.constructor 中执行的
- loader 是在 run -> buildModules -> getSource 中执行的

### (4) plugin

- webpack 的 plugin 的发布订阅是通过 tapable 来实现的
- plugin 的定义
  - plugin 是一个具有 ( apply ) 方法的 ( 类 )
  - ( apply 方法 ) 的参数是 ( Complier 类 new 时生成的实例 )
- 过程
  - 注册
    - **tap**
    - 1. apply() ------> plugin 会在 Compiler.constructor 中被调用，通过调用 plugin.apply(compiler)，执行 apply 方法
    - 2. apply(compiler)内部 ---> 会调用 compiler 实例上的 ( hooks ) 属性中的 ( 不同的生命周期方法 ) 上的 ( tap ) 方法进行 plugin 插件的注册
  - 调用
    - **call**
    - 在 Compiler 中的不同的函数之间，通过 hooks.call() 来调用

### (5) loader

- loader 其实就是一个 ( 函数 )，函数的第一个参数就该文件的 ( 源码字符串 )
- loader 不能写成箭头函数，因为箭头函数没有自己的 this，而 loader 需要通过 this 获取到更多的 api

## (二) webpack 打包流程

- run
  - buildModules
    - getSource
      - 通过 ( fs.readFileSync ) 获取 ( 当前模块的 ) ( 源码字符串 )
      - 将源码字符串交给 ( webpack.config.js 中的 module.rules.use 中的 loader ) 进行处理，并返回处理过后的源码字符串
    - parse
      - 将上面 getSource 中获得的源码字符串
      - 通过 @babel/parse + @babel/traverse + @babel/types + @babel/generator 进行 AST 相关的处理，返回处理完成后的源码字符串
  - emitFile
    - 将 ( 通过 loader 解析的模块的源码字符传 + 通过 AST 转化遍历添加修改删除再转成的源码字符串 ) 获得的源码字符串通过 ( fs.writeFileSync ) 写入 ( webpack.config.output ) 指定的文件夹中
