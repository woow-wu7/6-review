# 原型链

### (1) new 命令

- 作用
  - 执行构造函数
  - 返回实例对象
- 调用
  - new 命令本身就可以执行构造函数，所以 new 命令调用构造函数时可以不加 ()，也可以加()
  - 推荐 new 调用构造函数时，在函数后面加()
- 调用构造函数时，忘记使用 new 命令来调用怎么办？
  - 1.严格模式
  - 2.在构造函数内部通过 ( this instanceof constructor ) 做判断
- 原理
  - 1. 创建一个空对象，作为将要返回的实例对象
  - 2. 将这个空对象的原型(**`隐式原型__proto__`**)，指向构造函数的 prototype 属性(**显示原型 prototype**)
  - 3. 将构造函数中的 this 指向这个空对象
  - 4. 执行构造函数
  - 5. 判断返回值，如果构造函数 return 一个对象，则返回该对象；否则返回空对象(即 this 对象)
- 返回值
  - 若果构造函数内有 return 语句，并 return 后跟一个对象，new 命令会返回这个对象 ˝
  - 其他情况，new 会返回 this 对象
  - 对一个普通函数进行 new 命令调用，返回一个 ( 空对象 )
  - 总结：new 命令总会返回一个对象，要么是 ( 实例对象 )，要么是 ( return 语句指定的对象 )
- new.target
  - 在函数内部，可以使用 new.target，如果函数是 new 命令调用的，则 new.target 指向当前函数，否则返回 undefined
- 手写 new 命令

```
function Constructor(name, age) {
  this.name = name;
  this.age = age;
}

function _new(constructor) {
  const params = Array.from(arguments).slice(1); // 获取除constructor以外的参数作为构造函数的参数

  const obj = Object.create(constructor.prototype); // Object.create(obj) 以参数对象为原型生成实例对象，即相当于创建一个空对象，将空对象的隐式原型指向构造函数的prototype属性上
  const res = constructor.apply(obj, params); // 将构造函数中的this绑定到这个空对象上，并执行构造函数

  return Object.prototype.toString.call(res).includes("Object") // 判断返回值
    ? res
    : obj;
}

const obj = _new(Constructor, "woow_wu7", 20);
console.log("obj", obj);
```

- 手写 Object.create(obj)

```
// 手写 Object.create()
// const instance = Object.create(obj)
// 原理： 以参数对象为原型，生成实例对象
// 实现思路：利用 ( 原型链继承 )
function _create(obj) {
  function Temp() {} // 一个空的构造函数
  Temp.prototype = obj; // 将构造函数的prototype指向参数对象
  Temp.prototype.constructor = Temp; // 注意：修改了prototype属性时，记得要修改constructor的指向，防止引用出错
  const instance = new Temp(); // 生成实例，obj就是instance的原型对象
  return instance;
}

const o = {
  name: "woow_wu7",
};
const instance = _create(o);
console.log(Object.getPrototypeOf(instance) === o); // true
```

### (2) this 相关

- this 的使用场景
  - 构造函数中的 this -----------> 是指向实例对象
  - 函数和对象方法中的 this ------> 在函数调用时确定指向
  - 箭头函数中的 this -----------> 指代的是 ( 箭头函数声明时所在所用域 ) 的 ( 上层作用域中的 this ) - 作用域一共分为三种全局作用域，函数作用域，块级作用域
- 绑定 this
  - call
  - apply
  - bind
- apply 的应用
  - 找出数组最大元素：Math.max.apply(null, array)
  - 将类似数组的对象转成数组：Array.prototype.slice.apply(类似数组的对象)

### (3) 原型对象

- 构造函数的缺点
  - 构造函数生成的实例之间属性不回共享，造成资源的浪费
- 如何解决
  - 原型链来解决
  - 作用：( 原型对象 ) 上的所有 ( 属性和方法 )，都能被 ( 实例所共享 )
- 覆盖
  - 问题：什么是覆盖？
  - 回答：如果对象 ( 自身和原型 ) 上都有 ( 同一个属性 )，则会优先查找自身属性，这叫做 ( 覆盖 )

### (4) constructor

- 指向：prototype.constructor 指向 prototype 所在的 构造函数
- 继承：因为 constructor 属性在 prototype 上，所以可以被所有实例所继承
- 作用：
  - 1. constructor 的所用：可以得知 ( 某个实例对象 ) 到底是由 ( 哪个构造函数产生 )
  - 2. 可以从一个实例新建一个实例
- 注意点
  - 因为：( constructor ) 表示的是 ( 原型对象 ) 和 ( 构造函数 ) 之间的关系
  - 所以：修改 prototype 时都要修改 constructor 属性，防止引用出错
- name 属性
  - instance.constructor.name 返回构造函数的名称

### (5) instanceof

- 定义：instanceof 返回一个 ( boolean ) 值，表示 ( 左边实例对象 ) 是否是某个 ( 右边构造函数 ) 的 ( 实例 )
- 原理：检查右边构造函数的 prototype 属性是否在左边实例对象的原型链上
- 所以
  - a instanceof A === A.prototype.isPrototypeOf(a)
- 适用范围
  - instanceof 判断值类型时，只能用于对象
  - typeof 只能用于基本类型的数据，不能区分对象
  - 对于 ( null 和 undefined )，instanceof 总会返回 false
  - undefined instanceof Object // false
  - null instanceof Object // false
- instanceof 失真的情况
  - 如果 ( 左边对象的原型链上只有 null 对象 )，那么 instanceof 判断就会 ( 失真 )
- 作用
  - 1. 判断数据类型
  - 2. 解决忘记加 new 命令的情况

### (6) Object 对象

- Object.getPrototypeOf(obj)

  - 返回 ( 参数对象 ) 的 ( 原型对象 )，是 ( 获取原型对象的标准方法 )
  - const A = function(){}
  - const a = new A()
  - Object.getPrototypeOf(a) === A.prototype // true

- Object.setPrototypeOf(instanceObj, prototypeObj)

  - 参数
    - 第一个参数：现有对象
    - 第二个参数：原型对象
  - 作用
    - 将第一个参数的原型对象 设置为 第二个参数对象
  - const b1 = {}
  - const b2 = {}
  - Object.setPrototypeOf(b1, b2)
  - Object.getPrototypeOf(b1) === b2 // true

- Object.create()

  - 问题
    - 问题：如何生成不带任何属性和方法的对象？
    - 回答：Object.create(null)
  - 参数
    - Object.create()的参数只能是 ( 对象 )，如果是 ( 空 或者不是对象 ) 就会报错

- Object.prototype.isPrototypeOf(obj)

  - 作用：实例对象的 isPrototypeOf 方法，用来判断 ( 实例对象 ) 是否是 ( 参数对象 ) 的 ( 原型对象 )
  - 案例
    - const obj1 = {}
    - const obj2 = Object.create(obj1)
    - obj1.isPrototypeOf(obj2) // true

- Object.getOwnPropertyNames(obj)

  - 返回一个数组，成员是参数对象本身的所有 ( 属性名 )

- Object.prototype.hasOwnProperty(property)
  - 返回 ( 参数属性 ) 是否是该对象的 ( 自身属性 )
  - hasOwnProperty 方法是 JavaScript 之中唯一一个处理对象属性时，不会遍历原型链的方法

### (7) 获取原型对象的方法比较

- Object.getPrototypeOf(instanceObj) --- 推荐
- obj.constructor.prototype ------------ 手动修改时，容易忘记同时修改 constructor 的指向
- `__proto__` ---------------------------- 只有浏览器有

### (8) in 运算法 和 for...in 循环

- in
  - 'name' in {name: ''}
  - 不区分是 ( 自身属性 ) 还是 ( 继承的属性 )
- for...in
  - 作用：遍历所有可遍历的属性，不区分 ( 自身属性还是继承的属性 )
  - 问题
    - 问题：如果使用 for...in 循环遍历只遍历自身属性呢？
    - 回答：在内部使用 hasOwnProperty 来做判断
