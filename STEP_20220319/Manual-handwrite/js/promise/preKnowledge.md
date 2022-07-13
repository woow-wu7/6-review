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

### (2) promise 的一些基本概念

```
1. promise的特点
- promise对象的状态不受外界影响
  - 只有异步操作的结果可以决定当前的状态
  - 一共有三种状态 pending fulfilled rejected
- promise对象的状态
  - 一旦改变就不会再变。任何时候都能得到该结果
  - promise的状态改变只有两种可能：1.从pending-fulfilled 2.从pending-rejected

2. promise的缺点 - ( 3个 )
- 一旦新建就会立即执行，中途无法取消
- 如果不设置回调函数，promise内部抛出的错误，不会反应到外部
- 当处于pending状态时，无法得知当前进展到哪一个阶段

3. resolve函数的作用（ 三个作用 ）
- 将 promise 对象的状态由 ( pending -> fulfilled )，调用时机是在异步操作成功时调用，并将异步操作的结果通过 ( 参数 ) 传递出去
- 传递出去的参数，将会作为 ( then ) 函数的 ( 第一个参数函数 - 该函数在promise状态变成fulfilled以被调用 ) 的 ( 参数 )
- 1. 改变状态
- 2. 存储终值
- 3. 执行 onFulfilledCallbacks 数组中的回调函数

4. then
- 作用
  - 添加promise状态改变后的回调
  - 第一个参数函数：成功时的回调，fulfilled状态的回调
  - 第二个参数函数：失败时的回调，rejected状态的回调
- 返回
  - 一个新的promise对象，可以链式调用

5. catch
- 返回
  - 一个新的promise对象
  - 所以后面仍然可以接 then 方法
- 特点
  - catch中还能再抛错误

6. finally
- 特点
  - 不管promise的最终状态如何，都会执行finally函数
- 参数
  - finally方法不接受任何参数
  - 同时也说明了 finally 中的操作不依赖 promise 的状态

7. all --------- 和 any 相反
- 作用
  - 将多个promise实例，包装成一个新的promise实例
  - 1. 所有 fulfilled，才 fulfilled
  - 2. 一个 rejected，整个就 rejected
- 参数
  - 数组(成员是promise实例，不是实例会调用 Promise.resolve()来处理)
  - 或者具有 iterator 接口的数据结构
- 返回值
  - 一个新的 promise 对象

- 注意
  - 如果参数promise的成员自己定义了catch，当该promise报错错误时，是不会被Promise.all().catch()所捕获的

8. race
- 作用
  - 将多个promise实例，包装成一个新的promise实例
  - 谁先 fulfilled，整个就 fulfilled
  - 谁先 rejected，真哥哥就 rejected

9. allSettled ---- 所有promise执行完毕后执行
- 作用
  - 不管数组成员的状态如何，当所有promise执行完后，再执行
  - 该方法返回的新的 Promise 实例，一旦发生状态变更，状态总是fulfilled，不会变成rejected
  - 状态变成fulfilled后，它的回调函数会接收到一个数组作为参数，该数组的每个成员对应前面数组的每个 Promise 对象
- settled 是固定的意思

10. any -------- 和 all 相反
- 作用
  - 只要一个fulfilled，整个fulfilled
  - 所有rejected，整个才rejected

11. 如何让同步函数同步执行，异步函数异步执行？
- Promise.try
- async 包装
- promise 包装
```

# Promise 面试题

- https://juejin.cn/post/6844904077537574919
