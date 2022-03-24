# 深浅拷贝

### (1) 数据类型 (8 种)

基础数据类型：number string boolean null undefined symbol bigint
引用数据类型：array object function date error error ...

# (一) 浅拷贝

### (1) 数组的浅拷贝

- Array.prototype.slice()
- Array.prototype.concat()
- [...]

### (2) 对象的浅拷贝

- Object.assign()
- {...}

# (二) 深拷贝

- JSON.parse(JSON.stringify())
- 手写

# (三) 手写 - 深拷贝

### (1) 前置知识

- 需要解决的问题
  - 属性的循环引用 ------------------------------------- 通过 map 来解决
  - symbol 类型的 key 的复制 --------------------------- 通过 Reflect 来解决
  - 特殊对象的拷贝：比如 Date Error RegExp 等 ------------ 通过结构化克隆来解决
- for...in - **既可以遍历对象，也可以遍历数据**
  - 既可以 ( 遍历对象 )，也可以 ( 遍历数组 )
  - 遍历时，对象和数组都是遍历出来 key；数组的 key 就是下标
  - 注意：**for...in 可以遍历继承的属性**
- for...of - **只能遍历数组，不能遍历对象**
  - 可以遍历所有具有 iterator 接口的数据
  - 数组，map，set，arguments 等
- Symbol
  - Symbol 数据类型不能用 new 命令来调用
  - 参数也可以是一个数组
- Reflect
  - Reflect.ownKeys(obj) ---------------> 返回参数对象的所有 key，包括 Symbol 类型的数据
  - Reflect.ownKeys = Object.getOwnPropertyNames() + Object.getOwnPropertySymbols()
  - 对比
    - Object.keys() --------------------> 自身属性 和 可枚举属性
    - Object.getOwnPropertyNames() -----> 自身属性 和 可枚举属性 + 不可枚举属性 ( 注意：不包含 symbol 属性 )
    - Reflect.ownKeys() ----------------> 自身属性 和 可枚举属性 + 不可枚举属性 ( 包含 symbol 属性 )
