# npm 发包相关的知识点

```
1
main module browser
---

- (1) 问题
  - 问题：为什么 package.json 中需要这么多字段 main module browser ？
  - 回答：因为有些包只用于浏览器，有的包只能用node，有的包需要兼容两种环境
  - 回答：如果我们需要开发一个包，同时兼容 ( 浏览器和node环境 )，就需要在不同的环境下加载 ( 包的不同入口 ) 文件，一个main字段已经不能满足需求，就衍生出了 module 和 browser 字段

- (2) 问题
  - 问题：什么是 .mjs 文件
  - 回答：前端 esm 和 commonjs 规范，为了能在 ( node环境执行esm环境的模块 ) ( .mjs  ) 就应运而生

- (3) 问题
  - 问题：index.js 和 index.mjs 两种文件的优先级
  - 回答：index.mjs > index.js
  - 回答：也就是说会优先加载 index.mjs，没有才会去加载 index.js

- (4) 问题
  - 问题：main module browser 三者的含义
  - 回答：
    - main：----- 定义 npm 包的入口文件 --------------- browser环境 和 node环境 都能使用
    - module：--- 定义 npm 包的 ESM 规范的入口文件 ----- browser环境 和 node环境 都能使用
    - browser：-- 定义 npm 包 browder 环境的入口文件 -- browser环境能使用

- (5) 总结
  - 如果npm包导出的 ( ESM规范 ) 的包，使用 --------------------- ( module )
  - 如果npm包只在 ( web端使用 )，并且 ( 严禁在node端使用 )，使用 - ( browser )
  - 如果npm包只在 ( server端使用 )，使用 ---------------------- ( main )
  - 如果npm包在 ( browser端 和 server端 ) 都使用，使用 --------- ( module 或者 main )
```

```
2
npm包版本号
---

版本号基本是由三位数字组成：
   1   .   0   .   0   - beta.24
[MAJOR].[MINOR].[PATCH]-[alpha内部版本|beta公测版本|rc候选版本]

- MAJOR 进行不兼容的API更改时的版本 - 重大更新版本 不兼容
- MINOR 以向后兼容的方式添加功能时的版本 - 新功能 兼容
- PATCH 向后兼容的错误修复程序的版本 - 修复错误 兼容

// major 重要的 重大的
// minor 次要的 较小的
// patch 补丁

// alpha 希腊字母的第一个字母；开端；最初 ---- 内测
// beta 希腊字母的第二个字母 --------------- 公测
```

```
3
^ 和 ~ 的区别
^ 表示改变 minor 层级的版本
~ 表示改变 patch 层级的版本
---

"vue": "2.5.21",
"vue": "~2.5.21" // 2.5.x ---------- ( 不低于2.5.21小于2.6.x )
"vue": "^2.5.21", // 2.x.x --------- ( 不低于2.5.21小于3.x.x )
```

```
4
---

1. 第一次发包
- npm adduser --- 注意 npm 必须是npm的源，不能是淘宝等，可以使用nrm切换
- 然后输入 用户名 密码

2. 非第一次发包
npm login

3. 发布
npm publish

4. 撤销发布的包
npm unpublish
npm unpublish 包名@版本号

5.1 更新至新的补丁版本
npm version patch

5.2 更新版本号并进行git提交，自定义提交描述
npm version major -m "版本更新至%s"

5.3 更新至新的补丁版本，并不增加git的tag
npm version patch --no-git-tag-version

6.1 引用模块 - 全局安装的包，在项目里面只需要引用即可
npm link
npm link [<@scope>/]<pkg>[@<version>]

6.2 解除引用 npm unlink npm link [<@scope>/]<pkg>[@<version>]
```
