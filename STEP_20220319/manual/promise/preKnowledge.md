# Promise 前置知识

### (1) 同步任务 宏任务 微任务

```
1. 常见的 宏任务 和 微任务
- 宏任务
  - setTimeout
  - setInterval
  - setImmediate
  - requestAnimationFrame - 在浏览器下一帧渲染前执行
- 微任务
  - promise
  - process.nextTick
  - MutationObserver ------ 观测DOM变化

2. 同步任务 宏任务 微任务 的执行顺序
--> 同步任务
--> 清空微任务队列: 所有的微任务
--> 执行宏任务队列中的第一个宏任务
--> 清空微任务队列: 所有的微任务
--> 执行宏任务队列中的第一个宏任务
--> 直到所有任务都执行完毕
- 宏任务和微任务执行相当于：两层嵌套的for循环
- for() {// 宏任务 for() { // 微任务} }

3. 案例
- 请查看
- test1.html
- test2.html
- test3.html

4. 扩展
- 问题：为什么 process.nextTick() 在 Node 中可以任意阶段优先执行？
- 回答：应为 process.nextTick() 是一个微任务，其他阶段都是执行的宏任务比如setImmediate

5. async ... await
- async：与普通函数的区别是：async函数的返回值始终是一个promise对象
- await
  - 1. await 只能用于 async 函数中
  - 2. 【 当遇到 await 时，会执行紧跟着的await后面的函数，执行完后，( 立即跳出async函数，执行主线程的其他内容 )，执行完主线程内容后，回到 ( await ) 处继续执行 】
- 案例
  - test3.html
```
