# Error

### (1) Error 构造函数

- 所有 ( 抛出的错误 ) 都是 ( Error ) 构造函数的实例
- 参数：
  - 参数表示 ( 错误提示 )
- 运行
  - 当代码 解析或者运行 时发生错误，js 引擎就会自动产生，并抛出一个 Error 对象的实例，然后整个程序都会 ( 中断 ) 在发送错误的地方，不再往下执行
- 实例属性
  - error.message 表示错误提示
  - error.name 表示错误名称
  - error.stack 错误的堆栈

### (2) js 中的原生错误类型，一共有 6 种

- SyntaxError ------------ 语法错误
- ReferenceError --------- 引用错误 ---------------------- 引用不存在的变量；将一个值分配给无法分配的对象
- RangeError ------------- 范围错误 ---------------------- 一个值超出有效范围
- TypeError -------------- 类型错误 ---------------------- 变量或参数 不是预期类型
- URIError --------------- URI 错误 ---------------------- RUI 相关函数的参数不正确
  - encodeURI()
  - decodeURI()
  - encodeURIComponent()
  - decodeURIComponent()
  - escape()
  - unescape()
- EvalError -------------- eval()函数没有正确执行

### (3) 自定义错误

- 除了 js 种 7 中内建的错误，还可以自己定义错误对象
  - error
  - syntaxError
  - referenceError
  - rangeError
  - typeError
  - uriError
  - evalError
- **原理**
  - 自定义错误的原理是：自己定义一个构造函数 ( 将该构造函数.prototype 指向 new Error() 的实例子，同时修改 constructor 的指向 )
  - 其实就是：原型链继承

```
function UserError(message) {
   this.message = message || "默认信息";
   this.name = "UserError";
}

UserError.prototype = new Error();
UserError.prototype.constructor = UserError; // 修改 prototype 属性后，一定要修改 prototype上的constructor属性
```

### (4) throw 语句

- **作用**
  - 中断程序执行，抛出一个意外或者错误
- 参数
  - throw 语句 接收一个 ( 表达式 ) 作为参数，可以抛出各种值

### (5) try...catch

- catch
  - 参数：catch 接收一个参数，表示 try 代码块抛出的值
  - 执行：当 catch 捕获到错误之后，程序不会中断，会继续往下执行
  - 再抛错误：catch 代码块中还能再抛出错误，甚至可以使用嵌套的 try...catch

### (6) finally

- try...catch 允许用户在最后添加一个 finally 代码块，( 不管是否发送错误 ) 都必须在最后执行
