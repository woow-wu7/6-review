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
- async
  - 作用：始终返回一个promise对象
    - 1. 如果返回值不是promise对象：如果async函数的返回值不是promise对象，这回通过 Promise.resolve() 包装成fulfilled状态的 promise 对象
    - 2. 若果没有返回值时：如果async函数没有返回值，则会返回 Promise.resolve(undefined)
  - 执行顺序
    - ( !!!重要!!! ) 当 async 函数中有 await 时，执行完await后面的表达式，async会让出当前线程，将await表达式后面的代码放入 ( 微任务队列 ) 中，继续执行 async 函数后面的代码
- await
  - 1. 出现的地方：await 只能用于 async 函数中
  - 2. await等待的是什么？
    - 如果await等待的是一个：( promise对象 )，则await会 ( 阻塞 ) 后面代码的执行，直到promise状态变成resolve，但是 !!!!! async函数不会阻塞
    - 当然await后面的表达是可以是任意类型的值，不一定非要是promise对象，不是promise时，await等待的就是紧跟的表达是的返回值
- 案例
  - test3.html
  - test4.html
  - test5.html
```
