# 跨域

### (1) 跨域常见解决方案

- cors
  - cross-origin-resource-share 跨域资源共享
- nginx
  - server -> location -> proxy_pass
- jsonp
  - 只支持 GET 请求
  - script 的 ----- src 属性
  - img 的 -------- src 属性
  - link 的 ------- href 属性
- 前端启的本地服务
  - 设置 proxy 跨域

### (2) cors - 跨域资源共享

- 定义
  - cors 是 cross-origin-resource-share 跨域资源共享 的意思
  - 它允许浏览器发送向 ( 跨源服务器 ) 发送 ( XMLHttpRequest ) 请求，从而克服了浏览器的 ( 同源限制 )
- 注意点
  - cors 需要 ( 浏览器 ) 和 ( 服务器 ) 同时支持
- 分类
  - 简单请求
  - 非简单请求
  - 区别：非简单请求会比简单请求多一次 ( 预检请求-options 请求 )
- 简单请求
  - (1) 简单请求的条件
    - 1. 请求的方法：必须是 GET POST HEAD 即 http1.0 中的三种方法中的一种
    - 2. HTTP 的头信息不超出以下字段
      - Accept
      - Accept-Language
      - Content-Language
      - Last-Event-ID
      - Content-Type:
        - 只限于 application/x-www-form-urlencoded multipart/form-data text/plain
        - multipart/form-data 这是表单默认的提交方式，历史上 multipart/form-data 是可以发送跨域请求的
  - (2) 简单请求的具体细节
    - 发送请求
      - Origin：
        - 增加：在请求头中增加：Origin 字段
        - 作用：Origin 用来说明本次请求来自哪个 - 源 ( 协议，域名，端口 )，服务器根据 Origin 的值决定是否同意本次请求
      - 1. 如果 Origin 指定的源，不在许可范围，响应头中将不包含 Access-Control-Allow-Origin
      - 2. 如果 Origin 指定的源，在许可范围，则在响应头中会多出下面几个 ( 响应头 )
    - 响应请求
      - 响应头
      - Access-Control-Allow-Origin
        - 要么是 ( \* )，表示接受任意域名的请求
        - 要么是请求时发送的 Origin 指定的值
      - Access-Control-Allow-Credentials
        - 服务器
          - 是一个 boolean 值，表示是否允许发送 cookie
          - 默认请求下，cookie 不在 cors 请求中
        - 浏览器
          - XMLHttpRequest
            - 设置 **xhr.withCredentials = true**
          - fetch
            - 设置 **credentials: include || same-origin || omit**
              - same-origin ---- 不发送 cookie
              - include -------- 总是发送 cookie
              - omit ----------- 不发送 cookie，即使是同源；omit 是省略的意思
      - Access-Control-Expose-Headers
- 非简单请求
  - 哪些请求是非简单请求
    - 请求的方法：PUT DELETE 等都是非简单请求
    - Content-Type: application/json 也是非简单请求
  - 预检请求的作用
    - 1. 先询问服务器，当前网页是否在服务器许可的名单中
    - 2. 使用哪些 HTTP 头字段
  - ( 预检请求 ) 的 ( 请求头 )
    - Access-Control-Request-Method -----> 列出 cors 请求会用到哪些 HTTP 方法
    - Access-Control-Request-Headers ----> 指定浏览器 cors 请求会额外发送的 ( 头信息 ) 字段
  - ( 预检请求 ) 的 ( 响应头 )
    - Access-Control-Allow-Origin -------> 允许跨域的源
    - Access-Control-Allow-Methods: GET, POST, PUT
    - Access-Control-Allow-Headers: X-Custom-Header
    - Access-Control-Allow-Credentials: true
    - Access-Control-Max-Age: 1728000

### Accept 和 Content-Type 的区别

- Accept
  - 请求头
  - 表示的是 ( 客户端 ) 希望接受的数据类型
- Content-Type
  - 通用头(请求头和响应头都有)
    - 请求头
    - 响应头
  - 表示的是 ( 客户端和服务器端 ) 发送的 ( 实体数据 ) 类型
