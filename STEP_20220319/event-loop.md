# 事件循环

### (1) node 的事件循环

- timers 阶段
  - 也叫 ( 定时器阶段 )，主要是 ( 定时 ) 和 执行 ( 到点的计时器 )
- pending callback 阶段
  - 系统相关
- idea prepare 阶段
  - 准备工作
- poll 阶段 - 轮询阶段 - poll 是轮询的意思
  - 1. 如果轮询队列不为空，依次取出执行，直到轮训队列为空或者到达系统的最大限制
  - 2. 如果轮询队列为空
    - 1. 如果之前设置过 setImmediate 函数，则进入下一个阶段即进入 check 阶段
    - 2. 如果之前没有设置过 setImmediate 函数，则会一直处于等待
      - 直到轮询队列中有新的函数添加进来，就会执行 poll 阶段的 1
      - 如果定时器到点了，也会进入下一阶段 check 阶段
- check 阶段
  - 执行 setImmediate 函数
- close callback 阶段
  - 执行 close 回调函数
- 注意点
  - process.nextTick() 可以在任意阶段优先执行，因为它是一个微任务

### (2) 浏览器环境

- 宏任务队列 微任务队列
- 微任务
  - promise
  - process.nextTick
  - MutationObserver - 在 DOM 结构发送变化时调用
- 宏任务
  - setTimeout
  - setInterval
  - setImmediate
  - requestAnimationFrame
