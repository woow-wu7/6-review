# cookie

- 定义
  - cookie 是服务器保存在浏览器上的 ( 一小段文本信息 )
  - 大小不会超过 4 kb
  - 每次请求时都会携带 cookie
- 保存的信息
  - cookie 的名字
  - cookie 的值
  - 到期时间
  - 所属的域名
  - 生效的路径
- 浏览器
  - 浏览器可以设置不接收 cookie，也可以设置不向服务器发送 cookie
- 获取当前网页的 cookie
  - document.cookie
  - 读
    - 读取 cookie 时，是 ( 所有 ) 的 cookie 用分号拼接成的字符串
  - 写
    - 写入 cookie 时，只能 ( 一个一个 ) 的写入，并且写入不是 ( 覆盖 )，而是 ( 添加 )
  - 读写差异
    - document.cookie 的读写差异，与浏览器和服务器之间的 ( 通信格式 ) 有关
    - **`Cookie 请求头`**
      - 1. http 请求头的 Cookie 是一次统一发送
      - 2. 服务器有两点是不知道的
        - cookie 的各种属性
        - 哪个域名设置的 cookie
      - 例子：`Cookie: cookie_name1=cookie_value1; cookie_name2=cookie_value2` 只能看到 key 和 value，其他的信息都不知道
    - **`Set-Cookie 响应头`**：服务端返回的响应头的 ( Set-Cookie ) 是 ( 分行指定 )
      - 1. 一次只能写入一个
      - 2. 分行指定
      - 例子：
        - `Set-Cookie: cookie_name2=cookie_value2; expires=Sun, 16 Jul 3567 06:23:41 GM`
        - Set-Cookie 的值具有这些属性：key-value, expires, domain, path, max-age, httpOnly
  - 注意：
    - 分号分隔的字符串：document.cookie 获取到的时 ( 所有 ) 的 cookie 用 ( 分号分割的字符串 )
    - 可读写：document.cookie 是可 ( 读写 ) 的

### (1) cookie 的属性

- value ------------ 是一个 ( 键值对 )
- expires
- domain
- path
- secure
- max-age ----------- 表示 cookie 的有效期
- httpOnly ---------- 用来设置 cookie 不能通过 js 获取
  - document.cookie 就获取不到

### (2) cookie 的同源策略

- 只要 ( 域名 ) 和 ( 端口 ) 一样就能共享 cookie
- 不要求 ( 协议 ) 一样
