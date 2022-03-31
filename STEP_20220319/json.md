# json

- JSON 格式 - 是一种用于数据交换的 ( 文本格式 )
- 英语
  - 英语：notation 符号
  - 英语：javascript object notation
- json
  - json 对象是一个值，注意：只能是一个值，不能是两个或者多个值
- json 值的类型和格式严格的规定
  - 复合类型的值 ------------- 只能是 ( 对象或数组 )
    - 只能是 对象 或 数组
    - 不能是 function regexp date 对象
  - 原始类型的值 ------------- 只能是 number string boolean null
    - 只能是 number string boolean null
    - 不能是 NaN undefined Infinity -Infinity
  - 字符串 ------------------ 必须使用 ( 双引号 )，不能使用 ( 单引号 )
  - 对象的键名 --------------- 必须放在 ( 双引号 ) 里面
  - 数组或对象的最后一个成员后 -- 不能加逗号

# JSON.stringify(a,b,c)

- 作用：将一个 ( 值 ) 转成 ( json 字符串 )，该 json 字符串可以被 ( JSON.parse()还原 )
- 特殊情况 undefined function xml 对象
  - 对象
    - 如果 ( 对象 ) 的属性是 **undefined** **function** **xml** 对象，该属性会被 JSON.stringify 过滤
  - 数组
    - 如果 ( 数组 ) 的成员是 undefined function xml 对象，都会被转成 ( null )
  - 正则对象
    - ( 正则对象 ) 会被转化成 ( 空对象 )
  - 忽略对象的不可遍历的属性
    - enumerable = false 的属性是会被忽略的
- 第二个参数
  - 数组
    - 指定 ( 需要转成字符串 ) 的属性，即 ( 白名单 )
  - 函数
    - 修改 JSON.stringify() 的返回值，注意 ( 处理函数是递归的处理所有的键 )
- 第三个参数
  - JSON.stringify 还可以接受第三个参数，用于增加返回的 JSON 字符串的可读性
- JSON.parse()

```
JSON.stringify()
---

JSON.stringify('abc') === "\"foo\"" ------------ '"abc"'

var obj = { a: undefined, b: function () {} };
JSON.stringify(obj) // "{}" --------------- 因为对象的属性是 undefined function xml对象时，会被过滤

var arr = [undefined, function () {}];
JSON.stringify(arr) // "[null,null]" ------ 因为数组的成员是 undefined function xml对象时，都会被转成null

JSON.stringify(/abc/) // {} --------------- 因为正则对象会被转化成空对象
```

# JSON.parse(a,b)

- 第二个参数
  - 处理函数

```
JSON.parse("'1'")
- 报错
  - Uncaught SyntaxError: Unexpected token ' in JSON at position 0
- 原因
  - 因为 '1' 不符号JSON格式，JSON中的字符串必须是 ( 双引号 )，即 ( "1" )
- 对比
  - JSON.stringify('"1"') // 正确
  - JSON.stringify("'1'") // 错误
```

# 手写 JSON.stringify()

```
前置知识 - 手写JSON.strinfify()
---
1
JSON
- 概念
  - JSON 是一种数据交换的 ( 文本格式 )
- 类型和格式
  - 1. 引用类型 - 复合类型的值只有 2 种
    - 只能是 ( 对象 和 数组 )
    - 不能是 ( 函数，正则对象，日期对象 )
  - 2. 原始类型的值只有 4 种
    - 只能是 ( number string boolean null )
    - 不能是 ( undefined NaN Infinity -Inifinity )
  - 3. 字符串
    - 只能是 ( 双引号 )，不能是 ( 单引号 )
  - 4. 对象
    - 对象的 ( 键名 ) 必须放在 ( 双引号 ) 中
  - 5. 最后一个成员
    - 数组或者对象的最后一个成员 不能加逗号 ,



2
JSON.stringify()
- 函数签名
  - JSON.stringify(value[, replacer [, space]])
- 对象
  - 属性的值是 undefined function xml对象时，------------- 直接忽略
- 数组
  - 属性的值是 undefined function xml对象时，------------- 都转成 null
- 正则对象
  - 转成空对象
- 第二个参数
  - 数组 ----- 表示白名单
  - 函数 ----- 表示处理函数，处理函数递归处理每个键
- 例子
var obj = { a: undefined, b: function () {} };
JSON.stringify(obj) // "{}" --------------- 因为对象的属性是 undefined function xml对象时，会被过滤
--
var arr = [undefined, function () {}];
JSON.stringify(arr) // "[null,null]" ------ 因为数组的成员是 undefined function xml对象时，都会被转成null
--
JSON.stringify(/abc/) // {} --------------- 因为正则对象会被转化成空对象


3
JSON.parse(a,b)
------
JSON.parse("'1'")
- 报错
  - Uncaught SyntaxError: Unexpected token ' in JSON at position 0
- 原因
  - 因为 '1' 不符号JSON格式，JSON中的字符串必须是 ( 双引号 )，即 ( "1" )
- 对比
  - JSON.stringify('"1"') // 正确
  - JSON.stringify("'1'") // 错误
```

```
手写JSON.stringify()

---
1. 函数签名 - JSON.stringify(value[, replacer [, space]])

---
2. JSON.stringify() 各种参数类型的返回值
- undefined ------------- undefined
- function -------------- undefined
- Symbol ---------------- undefined
- 对象中有 undefined function Symbol ---- 忽略者几种值
- 数组中有 undefined function Symbol ---- 'null'
- null --------------------------------- 'null'
- NaN ---------------------------------- 'null'
- Infinity ----------------------------- 'null'
- 正则对象 ------------------------------ '{}'
- number 'number的值'
- string 'string的值'
- boolean 'boolean的值'
- 引用类型的值
  - 1. 如果有 toJSON() 方法，那么序列化 toJSON() 的返回值
  - 2. 属性的值是 undefined function symbol 类型，直接略过
- 注意以上是有规律的
  - undefined function Symbol 单独作为参数，作为对象的值，作为数组成员的不同区别
    - 单独作为参数 ------ 返回 'undefined'
    - 对象中的属性值 ---- 直接略过
    - 数组中的成员 ------ 转成 null


---
3. 手写
function JSONStringify(params) {
  const type = Object.prototype.toString.call(params);
  const isNumber = type.includes("Number");
  const isString = type.includes("String");
  const isBoolean = type.includes("Boolean");
  const isNull = type.includes("Null");
  const isUndefined = type.includes("Undefined");
  const isSymbol = type.includes("Symbol");
  const isFunction = type.includes("Function");
  const isArray = type.includes("Array");
  const isObject = type.includes("Object");

  const isUndefinedFunctionSymbol = (data) => {
    return typeof data === 'undefined' ||
    typeof data === 'function' ||
    typeof data === 'symbol'
    }

  // BigInt ---- const isBigInt = type.includes('BigInt') ------ 注意 Json.stringify() 不能处理BigInt
  // NaN ------- 通过 Number.isNaN() 来判断
  // Infinity -- 通过直接是否相等来判断
  // string ---- string返回的是 "string" 双引号的字符串
  if (isUndefined || isFunction || isSymbol) return undefined;
  else if (isNull || Number.isNaN(params) || params === Infinity) return "null";

  // string
  else if (isString) return '"' + params + '"'; // 这里必须是双引号

  // number boolean
  else if (isNumber || isBoolean) return String(params);


  // function
  else if (params.toJSON && isFunction) { // 对象可能内置toJSON方法来自定义序列化对象
    return jsonStringify(data.toJSON());
  }

  // array
  else if (isArray) {
    let resultArr = [];
    for (let i = 0; i < params.length; i++) {
      if (isUndefinedFunctionSymbol(params[i])) { // 数组中有 undefined function symbol 转成 "null"
        resultArr[i] = "null";
      } else {
        resultArr[i] = JSONStringify(params[i]); // 递归调用自己
      }
    }
    console.log('resultArr', resultArr)
    resultArr = "[" + resultArr + "]";
    return resultArr.replace(/'/g, '"'); // 将单引号改成双引号
  }

  // object
  else if (isObject){
    console.log('3', 3)
    let result = [];
    Object.keys(params).forEach((item, index) => {
      if (typeof item !== "symbol") {
        //key 如果是 symbol 对象，忽略
        if (
          params[item] !== undefined && typeof params[item] !== 'function' && typeof params[item] !== 'symbol'
        ) {
          //键值如果是 undefined、function、symbol 为属性值，忽略
          result.push('"' + item + '"' + ":" + JSONStringify(params[item]));
        }
      }
    });
    return ("{" + result + "}").replace(/'/g, '"');
  }
}

const res = JSONStringify({a: 1, b: "1", c: false,  e: undefined, f: function(){}, g: Symbol(1), h: null, i: NaN, j: [1,'1',false, undefined, function(){}, Symbol(1), null, NaN]});
console.log("res: ", res);
console.log('typeof res', typeof res)
```

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0ea9eeb4629345a78035f01188136369~tplv-k3u1fbpfcp-watermark.image?)

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/aa986ef104ec41d7b641551d4dca2dda~tplv-k3u1fbpfcp-watermark.image?)
