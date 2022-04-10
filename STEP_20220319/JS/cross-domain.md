# 跨域

- cors
- jsonp
- nginx
- 前端本地服务的 proxy

# (一) cors - 跨域资源共享

- 定义
  - cross origin resource share 跨域资源共享
  - 它允许浏览器发送 ( 跨源服务器 ) 的 ( XMLHttpRequest ) 请求，从而克服了浏览器的 ( 同源限制 )
- cors 请求的分类 ( 两类 )
  - 简单请求
  - 非简单请求
- **简单请求**
  - 必须同时满足以下两个条件就是简单请求
    - 请求的方法：GET POST HEAD
    - HTTP 的头信息不超过以下字段
      - Accept
      - Accept-Language
      - Content-Language
      - Last-Event-Id
      - Content-Type 只限于三个值
        - application/x-www-form-urlencoded
        - text/plain
        - multipart/form-data - 这是表单默认的提交方式，历史上 multipart/form-data 是可以发送跨域请求的
- Accept 和 Content-Type 的区别
  - Accept
    - 请求头
    - 表示的是 ( 客户端 ) 希望接受的数据类型
  - Content-Type
    - 通用头(请求头和响应头都有)
      - 请求头
      - 响应头
    - 表示的是 ( 客户端和服务器端 ) 发送的 ( 实体数据 ) 类型

### (1) 简单请求的流程

- **Origin**
  - 请求头
  - 当发出的请求是 ( 简单 cors 请求时 )，浏览器会自动添加上 ( Origin 请求头 )
  - 表示的是：本次请求来自哪个 ( 源 - 协议+域名+端口 )，服务器根据 Origin 的值决定是否同意本次请求
- 1. 如果 Origin 指定的源，不在许可范围，响应头中将不包含 Access-Control-Allow-Origin
- 2. 如果 Origin 指定的源，在许可范围，则在响应头中会多出下面几个 ( 响应头 )
  - Access-Control-Allow-Origin
    - 该值要么是：请求时请求头 Origin 指定的值
    - 要么是： `*` ，表示接受任意域名的请求
  - Access-Control-Allow-Credentials
    - 表示允许发送 cookie
    - 除了在响应头中用响应头 Access-Control-Allow-Credentials 表示服务器允许携带 cookie，浏览器还要设置 XMLHttpRequest 的 withCredentials 是 true
      - XMLHttpRequest
        - **xhr.withCredentials = true**
      - fetch
        - **credentials**
          - same-origin ---- 不发送 cookie
          - include -------- 总是发送 cookie
          - omit ----------- 不发送 cookie，即使是同源；omit 是省略的意思
  - Access-Control-Expose-Headers
    - 如何想要拿到其他字段，需要在本 header 头中指定

### (2) 非简单请求的流程

- 概念
  - 非简单请求是那种对服务器有特殊要求的请求
  - PUT DELETE
  - Content-Type: application/json
  - 已上都属于非简单请求
- 特点
  - **OPTIONS** **预检请求** ---------> 预检非简单请求会在正式通信前，多一次 ( 预检请求 - preflight )
  - preflight
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
