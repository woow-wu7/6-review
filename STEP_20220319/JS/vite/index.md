```
<script type="module">
  import { a } from './a.js'
</script>

上面的代码：script 标签的 type=module 时，浏览器会对 import引用 发起http请求获取模块a的内容，获取到内容后再执行

vite优势：vite不会打包，而是利用浏览器去加载a模块，少去了webpack打包后再加载的时间
vite缺点：首次加载的文件会很多，并且只能用 import，不能使用 require
```

# 编译 和 打包 的区别？

```
1. 首先有三个文件
// a.js
const a = () => { ... }
export { a }

// b.js
const b = () => { ... }
export { b }

// c.js
import { a } from './a'
import { b } from './b'
const c = () => { return a() + b() }
export { c }
---


2. 打包后的代码
const a = () => { ... }
const b = () => { ... }
const c = () => { return a() + b() }
export { c }
---


3. 编译后的代码
- 还是三个文件，a.js b.js c.js，三个文件并不会合并
```
