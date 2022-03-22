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
