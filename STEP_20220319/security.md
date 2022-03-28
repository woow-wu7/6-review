# 前端安全

### 前置知识

### cookie

### (1) XSS 攻击 - 跨站脚本攻击

- 英语：cross site script 跨站脚本攻击
- 原理：主要是通过 ( 注入脚本 ) 进行攻击
- 防护手段
  - httpOnly
    - 作用：
      - ( httpOnly ) 可以防止通过 ( 脚本 ) 获取 ( cookie )
      - 比如：document.cookie，XMLHttpRequest，RequestAPI 等都能获取到 cookie
  - 过滤检查
    - 做 html 和 js 的标签和代码转义
    - html --------> 做 form 表单，input，textArea 等标签做做标签的转换

### (2) CSRF 攻击 - 跨站请求伪造

- 英语：cross site request forgery 跨站请求伪造
- 原理：主要是在用户登录后，在 ( 没有登出 ) 的情况下，获取用户的 ( cookie ), 利用 cookie 向 ( 服务器 ) 发送 ( 虚假 ) 请求
- 防护：
  - 验证码
    - 1. 因为 csrf 就是在用户不知情的情况下向服务器发送了请求，验证码会 ( 强制用户和系统进行交互 )，从而有效预防 csrf 攻击
    - 2. 但是不能每个请求都加验证码，这样会太繁琐，所以一般只对敏感接口做验证码，并且作为防护 csrf 的辅助手段
  - Referer
    - 含义：Referer 是请求头，表示的是请求的源来自哪里
    - 哪些情况会发送 Referer，哪些情况不会发送 Referer
      - 不会发送：地址栏输入网址，书签
      - 发送：表单，链接，静态资源
  - token
    - 1. csrf 就是利用了用户没有登出的情况下获取 cookie，所以我们可以不用 cookie 来做身份验证
    - 2. 并且 token 是可以跨端的，cookie 只能用户浏览器端
