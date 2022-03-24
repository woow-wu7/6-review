# react

# (1) diff 算法

- 一些概念
  - 传统算法的时间复杂度：O(n^3) , n 是节点数
  - diff 算法可以把时间复杂度降低到 O(n)
  - 类型：treeDiff componentDiff elementDiff
- tree diff
  - 跨层级的移动非常少，逐层对统一层级的节点进行比较
- component diff
  - 同一类型的组件：会按照原策略逐层进行比较
  - 不同类型的组件：会被认为是脏组件，会替换掉整个组件的所有节点
  - 对于同一类型的组件：如果 virtual dom 没有变化，是不需要做 diff 算法比对的，可以通过 shouldComponentUpdate() 返回一个 false，不做 diff 算法比对，提升性能
  - 如何判断是不是同一类型的组件：看 class 是不是一样
- element diff
  - 当节点处于同一层级时，一共会有三种操作：( 添加 ) ( 删除 ) ( 移动 )
  - 一些基本概念
    - **oldIndex** -> 在旧集合中的位置
    - **lastIndex** -> 取 ( oldIndex ) 和 ( 上一次 lastIndex ) 的 - 较大值；lastIndex 初始值是 0
    - **`移动`**：oldIndex < lastIndex 时 ( 移动 )；移动的位置就是元素在新集合中的位置
    - **`不移动`**：oldIndex > lastIndex 时 ( 不移动 )
  - 根据上面的算法，产生了一些特殊的情况
    - 同一层级，如果第一个元素和最后一个元素交换，需要移动所有的元素，所以尽量较少这样的操作
