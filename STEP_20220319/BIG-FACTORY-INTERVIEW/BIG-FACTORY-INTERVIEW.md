# 大厂面试题

## (1) 0.1 + 0.2 的精度丢失？

- 前置知识
  - js 中使用 number 类型来表示数字，没有区分 ( 整数 ) 和 ( 浮点数 )
  - js 中通过 ( 64 位二进制 ) 来编码一个 ( 数字 )，遵循 IEEE754 标准
  - **一个浮点数的表示方法**
    - `浮点数的实际值 = 符号位(1位) * 指数偏移值(11位) * 分数值(52位小数)`
    - 1 + 11 + 52 = 64
    - Value = sign _ exponent _ fraction
- 数值的计算过程
  - 进制转换
  - 对阶运算
  - 两个过程都存在 ( 精度丢失 )
- **进制转换**
  - 因为计算机是用 ( 二进制 ) 进行计算的，而我们用的一般是 ( 十进制 )，所以需要 ( 进制转换 )
  - 当 十进制 转换成 二进制 时，可能出现无限循环的情况，所以需要 ( 截取 )，截取时就会存在精度丢失
- **对阶运算**
  - 由于指数位不同，运算时需要做 ( 对阶运算 )
- 注意点
  - 如果十进制数字 ( 十进制数字 ) 超过了 ( 16 位 )时，转成 ( 字符串 )，字符串对应的值和原数字会 ( 不相等 )

## (2) Object.freeze() 和 Object.seal() 的区别？

- Object.seal() ----- 不能 添加，删除属性，但是可以 ( 修改 ) 属性
- Object.freeze() --- 不能 添加，删除，修改，属性
- 应用
  - react 中的 ( ref.current ) 中的 current 属性就是只能修改，不能添加和删除，因为利用了 Object.seal() 实现
- seal 密封的意思
- freeze 冻结的意思

## (3) 跨标签通信

- 同源
  - Broadcast Channel 广播
  - storage 事件
  - window.open
- 非同源
  - iframe

```
跨标签通信

(一) 同源策略下的 - 跨标签通信
---

1. BroadCast Channel 广播通信
- 语法
  - 生成实例：const broadCastChannelInstance = new BroadcastChannel('广播的唯一标识符字符串')
  - 发送消息postMessage：broadCastChannelInstance.postMessage('消息')
  - 接收消息onmessage：broadCastChannelInstance.onmessage = function(e){} 或者 window.addEventListener('message',....)
  - 具体的数据可以在 e 事件对象中获取
- 注意点
  - 各个标签之间页面，都要生成广播实例，new的时候 ( 参数必须一样 ) 才能收到 ( 同一个广播 )

2. storage 广播
- 语法
  - 当 localStorage 发生变化时，会触发 ( storage ) 事件
- 原理
  - 当 localStorage 发生变化时，触发了storage，在需要监听localStorage变化的页面就可以获取到localStorage的值
  - 具体数据可以在 e 事件对象中获取，具体是 e.newValue

3. window.open
- const targetWindow = window.open('targeWindow的url')
- 发消息postMessage：targetWindow.postMessage
- 收消息onmessage：window.addEventListener('message') 或者 window.onmessage = function(){}
- 注意：发送消息时，需要保证接收消息的页面已经加载完成，通过 window.onload 中做监听

4. 链接 https://juejin.cn/post/6844903811232825357#heading-11
```

## (4) json 和 xml 的区别

```
json和xml的区别
---

1. xml是重量级的，json是轻量级的
2. xml传输慢，json传输快，因为xml比较重
3. xml和js交互复杂，json和js交互简单
   - xml需要将xlm转成html再和js交互
   - json直接可以使用js操作
4. xml的可读性强，json的可读性较弱
5. xml支持注释，json不支持注释
6. xml比json更加安全

xml
---
<?xml version="1.0" encoding="utf-8" ?>
<country>
  <name>中国</name>
  <province>
    <name>黑龙江</name>
    <citys>
      <city>哈尔滨</city>
      <city>大庆</city>
    </citys>  　　
  </province>
  <province>
    <name>广东</name>
    <citys>
      <city>广州</city>
      <city>深圳</city>
      <city>珠海</city>
    </citys> 　　
  </province>
</country>

json
---
{
    name: "中国",
    provinces: [
        { name: "黑龙江", citys: { city: ["哈尔滨", "大庆"]} },
        { name: "广东", citys: { city: ["广州", "深圳", "珠海"]} }
    ]
}

```

## (5) html和xml的区别
```
html和xml的区别
---

1. html中不区分大小写，xml中严格区分大小写
2. html中属性可以不带值，xml中属性必须有值
3. html中的标签是预定义的固有标签，不可扩展，xml中的标签不是固定的，可以自定义，可以扩展
4. html是用来显示数据的，xml是用来描述数据，存储数据的
```