# css 部分

### (1) position

- fixed 相对于浏览器窗口进行定位
- relative 相对于自己的正常位置进行定位
- **absolute**
  - 绝对定位，是相对于具有 ( 定位属性的父元素 )
  - 问题：什么是具有定位属性的父元素
  - 回答：就是除了 position: static 以外的其他定位属性都可以
- static 默认值
- inherit 继承，从父元素继承 position 的值
- **sticky** 粘性定位

#### (1.1) sticky 粘性定位

- 定位的基准点
  - position: sticky 的定位
    - 1. 是相对于 ( 具有滚动条的，距离最近的祖先元素 )
    - 2. 如果不存在这样的祖先元素，则是基于 ( viewport ) 来定位
- 表现上来看
  - ( position: sticky ) = ( position: fixed ) + ( position: relative )
- 案例
  - css/position:sticky

### (2) display:none 和 visibility: hidden 两者的区别

- display:none -------> 隐藏后不占据原来的位置
- visibility: hidden -> 隐藏后占据原来的位置
- 它们都会在 DOM 元素中，只是通过 css 的方式隐藏

### (3) display:inline-block 存在间隙的原因

- 原因
  - 标签之间存在 ( 空白字符 )
- 解决
  - 1. 父元素设置 font-size=0，然后在子元素中再设置需要的字体大小 ( 因为是空白字符，是一个字符，所以设置字体大小有效 )
  - 2. 各个标签不要换行

### (4) css 三角形

- triangle
- 1. 当 width 和 height 设置为 0，border 四边设置不同的颜色后，将出现 4 个三角形
  - 注意：
    - 底边：( triangle 的底边 ) 是 ( border 宽度 ) 的 ( 两倍 )
    - 高：( 高度 ) 是 ( border-bottom ) 的值
  - 问题：为什么会出现 4 个三角形呢？
  - 回答：因为 width 和 height 是 0，border 的四边相互遮住了
- 2. 实现向上的三角形 ------------ 相反
  - 将三边的 border 设置为透明
  - 设置 border-bottom 即可
  - 总结：设置 border 显示的方向 和 三角形的方法 是 ( 相反的 )

### (5) **`transform 和 position: fixed 的关系`**

- position: fixed
  - 1. 一般情况下，position: fixed 是基于 ( viewport ) 来 ( 定位的 )
  - 2. 但是，当 ( 祖先元素设置了 transform 为非 null 属性时 )，则是基于 ( 该祖先元素来定位 )

### (6) 盒模型

- 标准盒模型 和 ie 盒模型
- 标准盒模型：
  - box-sizing: content-box;
  - width 和 height 只包括 ( content )
- ie 盒模型
  - box-sizing: border-box;
  - width 和 height 包括：( content padding border )

### (7) **移动端 1px 物理边框**

- 前置知识
  - 英语
    - pixel 像素
    - ratio 比例
  - 如果获取屏幕的像素比
    - **`window.devicePixelRatio`**
  - 单位换算关系
    - 物理像素 = css 像素 乘以 像素比(几倍屏)
- 如何实现
  - 1. 利用 @media screen and (-webkit-min-device-pixel-ratio: 3)
  - 2. 利用 transform: scaleY()
  - 3. 利用伪元素来实现
- 案例
  - STEP_20220319/manual/css/1px.html

### (8) em 和 rem 的区别

- 相同点
  - 两者都是相对单位
- 不同点
  - em
    - em 作为 font-size 属性的单位时 -----> 1em 表示的是父元素的 font-size 大小
    - em 作为其他属性的单位时 -------------> 1em 表示的是 自身 font-size 的大小
  - rem
    - 特点
      - rem 是根据 html 元素的 font-size 作为基准
      - 1rem = html 的 font-size 的大小
    - 前置知识
      - **`物理像素 = css 像素 * 像素比(几倍屏)`**
      - 1. deviceWidth/ui 设计稿的总宽度 = 某元素的实际宽度/该元素 ui 宽度
      - 2. 推算出：某元素的实际宽度 = deviceWidth/ui 设计稿的总宽度 \* 该元素 ui 宽度
    - 实现原理
      - 动态计算 html 元素的 font-size
        - 1. 通过 js 方式 -------> document.documentElement.style.fontSize = document.documentElement.clientWidth / 750 + 'px'
        - 2. 通过 css 方式 ------> html{ font-size: 100vw /750 }

### (9) block inline inline-block 的区别

- 常见的 inline 元素
  - span a
- 常见的 inline-block 元素
  - input
  - select
  - textArea
  - img
- 常见的 block 元素
  - div
  - form
  - table
  - p
  - h1-h6
  - ul li

### (10) 双栏布局：左侧固定，右侧自适应布局

- float
  - left --> float: left
  - right -> margin-left: left 的宽度；其实可以不设置
  - 记得要清楚浮动带来的影响
- flex 布局
- 绝对定位

### (11) 三栏布局(圣杯布局) - 中间自适应，左右固宽

- float
  - left ----> float: left;width=200px;
  - right ---> float: right;width=200px;
  - center
    - margin-left: 200px;
    - margin-right: 200px;
  - 注意点
    - 1. 或者 overflow: hidden; 来代替 margin-left+marin-right;触发 BFC，则不会与浮动元素重叠
    - 2. 在书写标签时，是 left right center 的顺序，将 right 放在 center 的后面
    - 3. manual/cdd/三栏布局

### (12) BFC 块级格式化上下文

- block formatting context 块级格式化上下文
- 具有 BFC 特性的元素，可以看作是隔离了的 ( 独立元素 )，容器中的元素不会在 布局上 影响其他元素
- 重点
  - 如何触发 BFC？
    - 根元素
    - 浮动
    - 绝对定位
    - overflow：除了 visible 以外其他值 ( scroll auto hidden )
    - display: flex table-cell inline-block 都可以
- BFC 的运用
  - 1. 去除 margin 重叠
  - 2. 清除浮动 - 解决父元素高度塌陷的问题
- BFC 清除浮动的 ( 原理 )
  - 具有 BFC 特性的元素，在计算高度时，包含 ( 所有子元素 - 包括浮动的元素 )
  - 这样就能解决 ( 浮动后 - 造成的父元素高度塌陷的问题 )

### (13) 解决浮动后 父元素 高度塌陷 的方法有哪些？

- 给 ( 具有浮动元素的父元素 ) 添加一个 子元素，子元素设置高度即可
- 给 ( 具有浮动元素的父元素 ) 添加一个 伪元素，方法原理同上
- 触发 BFC
  - 根元素
  - 浮动
  - 绝对定位
  - overflow：除了 visible 以外的其他值，比如 auto scroll hidden
  - display：flex inline-block table-cell

### (14) 如何解决上下 margin 重叠

- margin overlap
- 1. 上下两个元素，设置相同方向的 margin
- 2. 使用 padding 代替 margin
- 3. 使 ( 上下两个元素 ) 在不同的 BFC 下
- 案例

```
1. margin重叠
---
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      .up {
        margin-bottom: 50px;
        background: red;
      }

      .down {
        margin-top: 50px;
        background: yellow;
        overflow: hidden;
      }
    </style>
  </head>
  <body>
    <div class="up">上</div>
    <div class="down">下</div>
  </body>
</html>
```

```
2. 解决margin重叠
- 利用BFC解决margin重叠 - 是上下两个元素在不同的BFC下
- 流程
  - 给down添加一个父元素
  - 给down的父元素触发BFC (根元素，浮动，绝对定位，overflow，display)
---

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      .up {
        margin-bottom: 50px;
        background: red;
      }

      .down-wrap {
        overflow: hidden;
      }

      .down {
        margin-top: 50px;
        background: yellow;
        overflow: hidden;
      }
    </style>
  </head>
  <body>
    <!-- 解决margin上下重叠 -->
    <div class="up">上</div>
    <div class="down-wrap">
      <div class="down">下</div>
    </div>
  </body>
</html>
```

### (15) 垂直水平居中

- 绝对定位
- flex
- table-cell
  - father ----------> display: table-cell;
  - father ----------> text-align: center;
  - father ----------> vertical-align: middle;
  - child -----------> display: inline-block;
- grid
  - father ----------> display: grid;
  - child -----------> justify-self: center;
  - child -----------> align-self: center;

### (16) sticky-footer

- 效果定义
  - 当内容不足一屏时，保持在底部。
  - 当内容超过一屏时，在内容的最底部
- 实现方式
  - margin + padding
  - calc 动态计算
  - flex 布局
- margin-padding
  - 特点：适合 ( footer 的高度固定 ) 的情况，兼容性好
  - section{main footer}
  - section 和其上的所有父元素都要设置 height: 100%;
  - main ------> min-height: 100%; padding-bottom: 200px; box-sizing: border-box;
  - footer ----> margin-top: -200px;
- flex
  - 特点：( 不需要知道 footer 的高度 )
  - section{main footer}
  - section ---> display: flex; flex-direction: column; min-height: 100%; 同时 section 以上的父元素都要设置 height: 100%才可以
  - main ------> flex: 1;
- calc
  - 特点：也只是适合于 ( footer 高度固定 ) 的情况
  - section{main footer}
  - section 和其上的所有父元素都要设置 height: 100%;
  - main ------> min-height: calc(100% - footer 的高度)

### (16) css 选择器

- 元素型选择器
- 关系型选择器
- 属性选择器
- 伪类选择器
- 元素选择器
  - - 通配符选择器
  - Element 元素选择器
  - `#` id 选择器
  - . 类选择器
- 关系选择器
  - E > F 子选择器
  - E F 后代选择器
  - E+F 相邻选择器，选择符合条件的相邻的兄弟元素 ( E 元素后相邻的兄弟元素 F )
  - E~F 兄弟选择器，选择符合条件的所有兄弟元素，不强调相邻 ( E 元素后面的所有兄弟元素 )
- 属性选择器
  - E[att]
  - E[att="val"] att 属性值是 val 的元素
  - E[att~="val"] 选择具有 att 属性且属性值其中一个等于 val 的 E 元素（包含只有一个值且该值等于 val 的情况）
  - E[att^="val"] 开头：选择 att 属性以 val 开头的元素
  - E[att$="val"] 结尾
  - E[att*="val"] 包含
- 伪类选择器
  - E:link
  - E:visited
  - E:hover
  - E:active
  - E:focus
