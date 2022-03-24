# curry 函数柯里化

- 定义：函数柯里化，是将 ( 接收多个参数的函数 ) 转成 ( 接收一个单一参数的函数 )，并 ( 返回该函数 ) 的技术

### 前置知识

- fn.length 和 arguments
  - fn.length ---------- 返回该函数 fn 的 ( 形参个数 )
  - arguments ---------- 实参

### (1) 柯里化阶段一

- 需求：将 add(1,2,3,4) 转成 add(1)(2)(3)(4)
- 缺点：
  - 缺点很明显，只能传固定的参数，不能处理任意多个参数的情况
  - 一次只能传入一个参数，不能传递多个参数，比如：add(1,2)(3)(4)

```
function add(a, b, c, d) {
  return a + b + c + d;
}
const _add = (a) => (b) => (c) => (d) => a + b + c + d;
const res = _add(1)(2)(3)(4);
```

### (2) 柯里化阶段二

- 优化点
  - 可以传任意多参数
  - 每一次调用也可以传任意多参数
- 缺点
  - 最后一次调用需要用不带参数来区分，有点不雅观

```
// 柯里化阶段二
const curryCreator = () => {
  let totalParams = [];

  const curry = (...rest) => {
    if (rest.length) {
      // 有参数的调用，则不断搜集
      totalParams = [...totalParams, ...rest];
      return curry;
    }
    return totalParams.reduce((total, current) => total + current); // 无参数的调用进行计算，这个想家的逻辑其实可以单独抽离出去
  };

  return curry;
};

const curry = curryCreator();
const res = curry(1, 2)(3)(4, 5, 6)();
console.log("res", res);
```

### (3) 柯里化阶段三

- 优化点 ( 解决阶段二中的缺点 )
  - 1. 计算相加的过程，直接通过传入函数，调用相加函数
  - 2. 判断参数是否已经收集满：通过 fn.length 来判断

```

const add = (a, b, c, d, e) => a + b + c + d + e;

const curryCreator = (addFn) => {
  let totalParams = [];

  const curry = (...rest) => {
    totalParams = [...totalParams, ...rest];

    if (totalParams.length < addFn.length) {
      return curry;
    }
    return addFn.apply(null, totalParams);
  };

  return curry;
};

const curry = curryCreator(add);
const res = curry(1, 2, 3)(4)(5); // 注意：此方法如果再次调用就会报错，因为计算部分和收集部分不能同时具有
console.log("res", res);
```

### (4) 柯里化阶段四

- 阶段三的问题
  - 阶段三的计算部分和收集部分是分离的，也就是说如果条件判断为收集完毕后，就是计算过程，而计算过程不再返回 curry 函数，所以到达了计算条件后再调用就会报错

```
const curryCreator = (addFn) => {
  let totalParams = [];

  // curry函数始终用来收集
  const curry = (...rest) => {
    totalParams = [...totalParams, ...rest];
    return curry;
  };

  // 再声明一个方法，调用时专门用来计算
  curry.add = () => totalParams.reduce((sum, current) => sum + current);

  return curry;
};

const curry = curryCreator();
curry(1, 2, 3)(4)(5)(6)(7, 2); // 注意：此方法如果再次调用就会报错，因为计算部分和收集部分不能同时具有
const res = curry.add();
console.log("res", res);
```
