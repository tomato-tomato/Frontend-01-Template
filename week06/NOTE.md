# 每周总结可以写在这里
## 有限状态机

- 每个状态都是一个机器
  - 在每一个机器里都可以做计算、存储、输出......
  - 所有的这些机器接受的输入都是一致的
  - 状态机的每一个机器本身没有状态。若用函数来表示，则它应该是纯函数（无副作用）
- 每一个机器知道下一个状态
  - 每个机器都有确定的下一个状态（Moore）
  - 每个机器根据输入决定下一个状态（Mealy）



## JS中的有限状态机（Mealy）

```js
//每个函数是一个状态
function state(input){//函数参数就是输入
    //在函数中，可以自由地编写代码，处理每个状态的逻辑
    return next;//返回值作为下一个状态 
}

////以下是调用/////
while(input){
    //获取输入
    state = state(input);//把状态机的返回值作为下一个状态
}
```
## 解析HTML
### 1.拆分文件

- 方便文件管理，把parse单独拆到文件中
- parser接收HTML文本作为参数，返回一颗DOM树



### 2.创建状态机

- 用有限状态机（FSM）来实现对HTML的分析
- 在HTML标准中，已经规定了HTML的状态



### 3.解析HTML标签

主要的标签有： 开始标签、结束标签和自封闭标签



### 4.创建元素

- 状态机中，除了状态迁移，还要加入业务逻辑
- 在标签结束状态提交标签token



### 5.处理属性

- 属性值有三种写法单引号、双引号、无引号，需要多状态处理
- 处理属性方式跟标签类似
- 属性结束时，把属性加到标签token上



### 6.构建DOM树

- 使用栈结构构建DOM树
- 遇到开始标签时创建元素并入栈，遇到结束标签时出栈
- 自封闭节点视为入栈后立即出栈
- 任何元素的父元素是它入栈前的栈顶



### 7.处理文本节点

- 文本节点与自封闭标签处理类似
- 多个文本节点需要合并




## CSS计算
### 1.搜集CSS规则

-   遇到 style 标签，把CSS 规则保存起来
-   利用 CSS parse 来分析 CSS 规则





### 2.添加调用 CSS

-   创建一个元素后，立即计算CSS
-   理论上，分析一个元素时，所有CSS规则都已经收集完毕



### 3.获取父元素序列

- 在computeCSS 函数中，必须要知道元素的所有父元素才能判断元素与规则是否匹配
- 我们首先获取的是"当前元素"，所以我们获得和计算父元素匹配的顺序时从内向外的



### 4.拆分选择器

- 选择器要从当前元素向外排列
- 复杂选择器拆成针对单个元素的选择器，用循环匹配父元素队列



### 5.计算选择器与元素匹配

- 根据选择器的类型和元素属性，计算是否与当前元素匹配



### 6.生成computed 属性

### 7.确定规则覆盖关系

- CSS规则根据specificity 和 后来有限规则覆盖
- specificity是个四元组，越左边权重越高
- 一个CSS规则的specificity根据包含的简单选择器相加而成