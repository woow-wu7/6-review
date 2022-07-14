# 作用域 + 作用域链 + 执行上下文(对象) + 执行上下文栈

### (一) 单词

- execution 执行 n

### (二) 总结

- 形成的时机
  - 函数作用域：在 ( 函数声明时 ) 确定
  - 函数执行上下文对象：在 ( 函数调用时，并且在函数体执行前 ) 创建
- 静态/动态
  - 函数作用域：静态的，函数定义时确定，且不会在变化
  - 函数执行上下文对象：动态的，函数调用时创建，函数执行完后释放，函数每调用一次就形成一次函数执行上下文对象
- 联系
  - ( 执行上下文对象 ) 从属于 ( 作用域 )
  - 函数执行上下文对象 从属于 函数作用域
  - 全局执行上下文对象 从属于 全局作用域
  - 因为只有函数存在，才会在调用并函数体执行前创建函数执行上下文对象

### (三) 作用域

- 定义
  - 作用域指：( 变量和函数 ) 存在的范围
- 作用
  - 作用域的主要的作用就是：( 隔离变量 )，即不同作用域的变量相互隔离，不会产生( 变量污染 )
- 分类
  - 全局作用域 - 全局变量，任何地方都可以被访问
  - 函数作用域 - 局部变量，在函数内可以被访问，函数外不能被访问
  - 块级作用域 - 代码块中生效
- 函数本身的作用域
  - 函数本身也是一个值，也有自己的作用域，函数本身的作用域是 ( 函数定义时所在的所用域，而不是函数调用时所在的作用域 )

### (四) 执行上下文 ( 对象 )

- 分类

  - 全局执行上下文
  - 函数执行上下文
  - eval

- 全局执行上下文

  - 在全局代码执行前，将 ( window ) 确定为 ( 全局执行上下文 )
  - 对全局数据进行预处理
    - 全局变量：-------------> 变量名提升，并赋值为 undefined，并作为 window 的属性
    - 全局函数：-------------> 函数名提升，并赋值为该函数，并作为 window 的属性
    - this：----------------> 将 this 赋值给 window

- 函数执行上下文

  - 在 ( 函数调用 ) ( 并且函数体执行前 ) 创建对应的 ( 函数执行上下文对象 )
  - 对函数内的局部数据进行预处理
    - 形参 ----------------> 将行参赋值为 ( 实参 )，并添加为该函数执行上下文对象的属性
    - arguments 对象 -------> 赋值，并添加为该函数执行上下文对象的属性
    - 局部变量 -------------> 变量名提升，并且赋值为 undefined，并作为该函数执行上下文对象的属性 -- ( 变量名存在 - 略过变量的声明，变量声明时会赋值undefined )
    - 局部函数 -------------> 将整个函数提升到头部，并作为该函数执行上下文对象的属性 -------------- ( 函数名存在，新的覆盖旧的 )
    - this ----------------> 将 this 赋值给调用该函数的 对象
  - !!!!!!!!!!!!!!!!! 优先级 !!!!!!!!!!!!!!!!!
    - 函数形参 > 函数声明 > 变量声明
    - 函数名已经存在，新的覆盖旧的
    - 变量名已经存在，直接跳过变量的声明
  - 例子如下
  - 案例 1

  ```
  function a(name, age) {
    console.log(name); // wang
    var name = 10;
    console.log(name); // 10
    console.log(age);  // undefined
  }
  a('wang')

  ---
  实际执行的代码如下：
  function a(name, age) {
    // 1. 变量提升：形参 > 函数声明 > 变量声明
    var name = 'wang' // 形参赋值实参
    var age = undefined // 未传实参，则将形参赋值为undefined
    // var name = undefined 变量提升，但是变量名已经存在，则直接略过变量的声明
    console.log(name) // 'wang'
    name = 10 // 从新赋值
    console.log(name) // 10
    console.log(age) // undefined
  }

  ---
  最终结果
  'wang' 10 undefined
  ```

  - 案例 2

  ```
  function a(name) {
    console.log(name); // function name() {.....}
    var name = 10;
    function name() { console.log('20') }; }
  a('wang')

  ---
  实际执行的代码如下：
  function a(name) {
    var name = 'wang'
    // var name = undefined 变量提升，但是变量名已经存在，直接略过变量的声明
    function name() { console.log('20')} // 函数提升，但是函数名已经存在，则新的覆盖旧的，即函数覆盖掉'wang'
    console.log(name) // 此处打印函数
    name = 10 // 从新赋值
  }

  ---
  最终结果
  function name() { console.log('20') };
  ```

- 总结
  - 每调用一次函数，就会产生一个函数执行上下文
  - 执行山下文就是一个 ( 对象 )
  - 执行上下文分为：全局执行上下文 函数执行上下文 eval

### (五) 执行上下文栈

- 定义
  - ( 全局代码 ) 执行前，js 引擎会创建一个 ( 栈 ) 来存储管理 ( 执行上下文栈 )
- 栈的特点
  - 后进先出，出口入口一样
  - 对比：队列是先进先出，入口出口不一样

### (六) 箭头函数中的 this

- 定义
  - 箭头函数中的 this，指的是 ( 该箭头函数定义时所在的作用域的 ) ( 上层作用域中的 this )
- 理解
  - 箭头函数中的 this：指代的是箭头函数定义时所在作用域 的 上层作用域中的 this
  - 1. 首先搞清楚有几种作用域：( 全局作用域 ) ( 函数作用域 ) ( 块级作用域 )
  - 2. 箭头函数的 this 指向 ( 一定是固定的 )
- 箭头函数的特点
  - 1. 箭头函数没有自己的 this，箭头函数中的 this 是，箭头函数定义时所在作用域的 ( 上层作用域 ) 中的 this
  - 2. 不能作为构造函数，即不能通过 new 命令来调用箭头函数
  - 3. 不能访问 arguments 对象，可以使用 rest 参数代替
  - 4. 不能使用 yield 来调用，即不能作为 generator 函数
- **案例 1**

```
var a = 1
const obj = {
  a: 11,
  b: () => console.log(a)
}

obj.b()
// 1
// 分析：箭头函数定义时所在的所用域是 ( 块级作用域 )，上层作用域中的this是window
```

- **案例 2**

```
var A = {
  name: "A",
  sayHello: function () {
    var s = () => console.log(this.name);
    return s;
  },
};

var sayHello = A.sayHello(); // 不管外面如何调用，都不会影响箭头函数this的指向，和调用无关
sayHello();

// A
// 分析
// 箭头函数定义时的作用域是 ( 函数作用域 )，上层作用域是 ( 块级作用域 )，上层作用域中的this指向对象A，所以A.name
```

- **案例 3**

```
window.color = "red";
//let 声明的全局变量不具有全局属性，即不能用window.访问
let color = "green";
let obj = {
    color: "blue",
    getColor: () => {
        return this.color;//this指向window
    }
};
let sayColor = () => {
    return this.color;//this指向window
};
obj.getColor();//red
sayColor();//red

分析：
1. let
  - 首先 let 声明的变量是块级作用域，并且不和window挂钩
  - var 声明的全局变量会和 window 挂钩，即 var a=1, 则 window.a=1
2. 箭头函数没有自己的this，箭头函数中的this是，箭头函数定义时所在作用域的 ( 上层作用域 ) 中的 this
  - getColor 所在的作用域是 ( 块级作用域 )，所以上层作用域是 ( window )，所以 this 指向window
  - sayColor 同理
```

### (七) var 和 let 的区别 ( 5 个区别 ) ？

- 作用域
  - let 声明的变量只在 ( 块级作用域 ) 中有效
  - var 声明的变量在代码块外也能访问
- 变量提升
  - var 声明的变量存在 变量提升
  - let 不存在变量提升，即 ( 不能先访问再声明 )
- 暂时性死区
  - let 声明的变量存在暂时性死区
  - var 不存在暂时性死区
- 重复声明
  - let 不能重复声名同一个变量
  - var 可以重复声名
- 是否和 window 挂钩
  - let 声明的全局变量不会和 window 挂钩
  - var 会和 window 挂钩，即 var a=1 声明的全局变量，可以通过 window.a 来访问

---

1
重复声明
var a = 1
var a = 2 // 不报错

- let bb = 1
  let bb = 2 // 报错
  VM933:2 Uncaught SyntaxError: Identifier 'bb' has already been declared

2
暂时性死区
var tmp = 123;
if (true) {
tmp = 'abc'; // ReferenceError
let tmp;
}

- 链接
  - https://juejin.cn/post/6844904046050934792
