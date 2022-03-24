# 前端路由

# (一) 前置知识

### (1) url 的组成

`http://www.baidu.com:80/stu/index.html?name=xxx&age=25#teacher`

- Protocol
  - http://
  - https://
- Domain
  - www.baidu.com
- Port
  - http 的默认端口：80
  - https 的默认端口：443
- Path
  - /之后，？之前的部分
- Query
  - ?开始到结尾
  - 或者 ?开始到#号
- Hash
  - #号开始到结尾

### (2) DOMContentLoaded 和 load 事件

- DOMContentLoaded
  - DOM 解析完成时触发
- window.load 和 window.addEventListener('load', ()=>{})
  - load 需要在 DOM 解析完成，图片，视频，样式等所有资源解析完成后才会触发，即页面加载完成后触发

# (二) hash 路由

- 当 a 标签中的 href 带有#时，点击 a 标签时，地址栏的 hash 部分回变化，但是整个页面不会刷新
- hashchange 事件
  - 当 hashchange 事件触发时，地址栏 hash 会发生变化，整个页面不回刷新
- 手写 hash 路由
  - manual/router/hash-router.html

# (三) history 路由

- popstate
  - 触发 popstate 的条件
    - 浏览器的前进和后退按钮
    - history.go()
    - history.back()
    - history.forward()
    - history.push()
- pushState 和 replaceState
  - window.history.pushState(state, title, url)
  - window.history.replaceState(state, title, url)
- 注意点
  - pushState 和 replaceState 只会改变 history 对象，不会刷新页面，同时地址栏的 path 部分会发生变化
- 优点和缺点
  - 优点：相比于 hashRouter，historyRouter 没有#号，相对更美观
  - 缺点：但是 historyRouter 需要服务端的支持
- 实现原理
  - 第一条线
  - 1. 给每个 a 标签添加自定义属性，data-href，值是需要导航的 path
  - 2. 遍历每个 a 标签，给每个 a 标签都添加一个 click 事件，在 click 事件中获取 a 标签的自定义属性 data-href
  - 3. 获取到 data-href 后，调用 window.history.pushState(state, title, url) 改变 url，地址栏的 url 变化
  - 4. 在通过 window.location.pathname 获取到 path，然后更新页面即可
  - 第二条线
    - 通过浏览器前进和后退来触发 popstate，从而触发页面更新
- 手写 history 路由
  - manual/router/history-router.html
