# vue

### (1) vue 的生命周期

- mount 阶段
  - beforeCreate
  - created
  - beforeMount
  - mounted
- update 阶段
  - beforeUpdate
  - updated
- umMount 阶段
  - beforeUnmount
  - unMount
- keep-alive 相关
  - activated ------- keepAlive 缓存的组件激活时触发
  - deactivated ----- keepAlive 缓存的组件失活时触发
- 错误相关
  - errorCaptured --- 在捕获一个来自后代组件的错误时被调用
