# 每周总结可以写在这里
# 选择器部分

## 选择器语法

- 简单选择器
  - *
  - div svg | a
  - .cls
  - #id
  - [attr=value]
  - :hover
  - ::before



- 复合选择器
  - <简单选择器><简单选择器><简单选择器>
  - \* 或者 div 必须写在最前面
- 复杂选择器
  - <复合选择器><sp><复合选择器>
  - <复合选择器>">"<复合选择器>
  - <复合选择器>"~"<复合选择器>
  - <复合选择器>"+"<复合选择器>
  - <复合选择器>"||"<复合选择器>



## 选择器优先级

- 简单选择器计数  
- **[行内选择符，ID选择符，class/属性/伪类选择符，元素/伪元素选择符]**
  - div#a.b .c[id=x]   [0,1,3,1] 
  - #a:not(#b)  [0,2,0,0]     （:not 不参与优先级计算）
  - *.a [0,0,1,0]   (\* 不参与优先级计算)
  - div.a [0,0,1,1]
- ! important > 行内样式 > ID选择器 > 类选择器 > 标签 > 通配符 > 继承 > 浏览器默认属性



## 伪类

- 链接/行为
  - :any-link
  - :link :visited
  - :hover
  - :active
  - :focus
  - :target



- 树结构

  - :**empty**

  - **:nth-child()**

  - :nth-last-chid()

  - **:first-child** :last-child :only-child

    

- 逻辑型
  - :not 伪类
  - :where :has



## 伪元素

- ::before
- ::after
- ::first-line
  - font系列
  - color系列
  - background系列
  - word-spacing
  - letter-spacing
  - text-decoration
  - text-transform
  - line-height
- ::first-letter
  - font系列
  - color系列
  - background系列
  - word-spacing
  - letter-spacing
  - text-decoration
  - text-transform
  - line-height
  - float
  - vertical-align
  - 盒模型系列:margin padding border 



# 排版部分

DOM树中存储的时 元素 和其它类型的节点。

CSS 选择器选中的时 元素，在排版时可能产生多个 盒子。

排版和渲染的基本单位时 盒子。



## 正常流排版

- 收集盒进 行
- 计算盒在 行中 的排布
- 计算行 的排布



### 行模型

对于中文没有基准线。文字上缘，文字下缘，以及文字的空白。

对于英文和数字，基线在文字底部。对于没有文字的盒子，它的基线在底部。

inline-block 一般配合 vertical-align 使用。

行模型中高度超过line-height的元素的最高的高度决定了行模型的高度。



### float与clear

first-letter 是 HTML源码中的 first letter

first-ling 是 CSS 排版中的 first line，first-line无法使用 float

让float的使用回归最原始的用处——文字环绕排版



### margin折叠

margin折叠只发生在BFC里，只发生在上下方向上。

BFC之间不进行 边距折叠。

只要盒子中有正常流 就可以产生BFC