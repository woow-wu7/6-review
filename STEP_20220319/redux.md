# redux 源码复习

- **redux** 中暴露出来的 api
  - createStore
  - combineReducers
  - applyMiddleware
  - bindActionCreators
  - compose
- **store 对象** 中属性和方法 - store 对象通过 createStore 函数生成
  - getState
  - dispatch
  - subscribe
  - replaceReducer

### (1) createStore

- createStore(reducer, preloadedState, enhancer) => storeObject
  - 1. 处理参数
    - 如果只有两个参数，并且第二个参数是 function 的话，就交换第二个和第三个参数
    - 此时 preloadedState=undefined，enhancer=function(){}
  - 2. 判断参数 - 来确定返回值
    - (1) enhancer 是 function
      - 则返回 enhancer(createStore)(reducer, preloadedState)
    - (2) enhancer 不存在
      - 即只有一个参数的情况，返回内部定义的几个方法和函数，其实就是返回一个**store 对象**
        - stored 对象
          - getState
          - dispatch
          - subscribe
          - replaceReducer

### (2) applyMiddleware

- 函数签名
  - (...middlewares) => (createStore) => (...args) => ({...store, dispatch})
    - **dispatch**
      - dispatch 是重写的 dispatch 函数
      - dispatch = compose(...chain)(store.dispatch)
    - **chain**
      - const chain = middlewares.map((middleware) => middleware(middlewareAPI))
      - [next => action => next(action), next => action => next(action)]
    - **compose**
      - 函数签名：(...funcs) => funcs.reduce((a,b) => (...args) => a(b(...args)))
      - 原理：其实就是给每个中间件第一层执行完后的函数，在包装一层
      - 最终：就是把 ( 右边中间件执行的结果 ) 作为 ( 左边中间件的参数传入 )，即 ( 洋葱模型 )
- 内部处理流程
  - 遍历所有中间件，执行每个中间件的第一层
    - 中间件：每个中间件都包含三层：({getState, dispatch}) => next => action => {...}
    - 执行了第一层后：next => action => {...}
    - chain: [next => action => next(action), next => action => next(action)]
      - 1. 这里是没有 chunk 这样处理异步函数的中间件的情况是 next(action)
      - 2. chunk 中间件的返回值则需要判断：( 可能是 next(action) ), ( 可能是 action() )
- applyMiddleware 最终的返回值
  - store
  - store 中的 dispatch 被重写

### (3) combineReducers

- 合并所有的 reducer 为最终的 rootReducer

### (4) bindActionCreators

- 函数签名
  - (actionCreator, dispatch) => () => dispatch(actionCreator.apply(this, arguments))
- 原理
  - 其实就是将 ( action 创建函数-actionCreator ) 执行的结果 ( action 对象 )，包装成一个函数 () => dispatch(action 创建函数执行的结果，即 action 对象)
  - 也就是说：执行 action 创建函数的时，会主动调用 dispatch 函数，将 action 提交给 reducer

### (6) redux-chunk 源码

- 很简单的三层高阶函数，满足 redux 中间件的三层，只是做了返回值的判断

```

function createThunkMiddleware(extraArgument) {
  return ({ dispatch, getState }) =>
    (next) =>
    (action) => {
      // action is function
      if (typeof action === 'function') {
        return action(dispatch, getState, extraArgument)
      }

      // action is object
      return next(action)
    }
}

const thunk = createThunkMiddleware()
thunk.withExtraArgument = createThunkMiddleware

export default thunk
```
