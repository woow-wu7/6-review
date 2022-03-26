# (一) call

### call 方法的基础概念

- 案例

  - manual/call-bind-apply

- 作用
  - 绑定 this 的指向
  - 执行 构造函数
- 参数
  - call 方法的参数：如果 ( 第一个参数 ) 是 ( 空 null undefined window ) 都会把函数中的 this 绑定在 ( window/global ) 上
  - call 方法的参数：如果 ( 第一个参数 ) 是 ( 原始值 )，则会将原始值转成 ( 包装对象 )，在绑定 this
  - call 方法的参数：可以接收多个参数，除了第一个参数，后面的参数会作为被绑定函数的参数传入
- **应用**
  - call 方法的一个重要应用就是：调用对象 ( 原生的 ) 方法

```
// call方法的应用
const obj = {};

console.log("obj.toString", obj.toString); // 调用obj原型上的toString

obj.toString = () => "reWrite obj prototype toString"; // 因为：--- 自身又声明了头String，就会发生覆盖，自身定义覆盖掉原型上的属性

console.log("obj.toString", obj.toString); // 所以：--------------- 当自身和原型上有相同的属性时，会先找自身，再找原型

console.log(
  "Object.prototype.toString.call(obj)",
  Object.prototype.toString.call(obj) // call方法的应用就是调用对象原生的prototype上的方法，而不用担心会被覆盖
);
```

### call 方法的模拟

- 新建一个函数，第一个参数是需要绑定的对象，后面的参数是要传给被绑定的函数的参数
- 在传入的参数对象上添加一个方法，赋值为 this，此时的 this 就指向了被绑定的函数
- 调用参数对象上的该方法，传入参数
- 删除声明的方法
- 并返回方法执行的结果，因为被绑定的函数可能有返回值

```
// call方法的模拟实现

// 注意：这里不能是箭头函数
// - 箭头函数没有this，箭头函数中的this是 ( 箭头函数定义时所在作用域中的 上层作用域中的this )
// - 因为没有this，不能做构造函数，不能使用call，bind，apply
// - 箭头函数argument对象，可以使用 rest 参数代替
// - 箭头函数不能使用 yield，所以不能作为 generator 函数

const object = {
  name: "woow_wu7",
};
function Constructor(name) {
  console.log(this.name);
  return this;
}

Function.prototype._call = function (obj) {
  const context = obj || window;
  context.fn = this; // Constructor._call() 调用时所子在的对象是 Constructor

  const params = [...arguments].slice(1); // 注意：这里不需要判断obj是不是存在，因为 ( 虽然call方法的第一个参数是 ( 空 ) 时绑定的是window，那么后面的参数还是会把第一个参数作为被绑定的对象 )
  const res = context.fn(...params);

  Reflect.deleteProperty(context, "fn"); // 删除fn
  return res;
};

const result = Constructor._call(object);
console.log("result", result);
```

# (二) apply

- apply 方法的实现和 call 方法差不多，直接略过

# (三) bind

- 作用
  - 绑定 this 指向
  - 返回一个新的函数，该函数接受 ( 除了 bind 时传入参数的剩余参数 )
- 注意点
  - 1. bind 方法可以只传部分参数
    - bind 方法调用时，可以只传入( 部分参数 )，剩下的参数可以在 ( 调用 bind 后返回的新函数调用时传入 )
  - 2. bind 返回的新函数，可以通过 new 的方式调用
    - 返回的新函数，可以通过 new 的方式调用，即 ( 返回的新函数 ) 可以作为 ( 构造函数 )
    - 此时，绑定的 this 失效
    - 同时，传入的参数仍然后效

```
const obj = {
  name: "woow_wu7",
};
function Constructor(age) {
  return this.name + age;
}

Function.prototype._bind = function (obj) {
  const context = obj || window;
  const bindParams = [...arguments].slice(1); // 获取外层参数

  const Temp = function () {}; // 寄生原型链式继承
  Temp.prototype = this.prototype;

  const self = this;
  function fBind() {
    const otherParams = [...arguments]; // 内层参数
    const totalParams = bindParams.concat(otherParams); // 总参数

    const res = self.apply(
      this instanceof self ? this : self,
      // 1. 如果是通过new来调用，this指向实例，而self是被绑定的函数
      // 2. 在下面通过 ( 寄生原型链式继承，将 this实例的原型指向了temp实例，而temp实例的原型是self.prototype)
      // 3. 所以：通过new调用，this绑定为实例对象，不是new调用就this就绑定为传入的参数对象
      totalParams
    );
    return res;
  }
  fBind.prototype = new Temp();

  return fBind;
}
```
