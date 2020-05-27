# 每周总结可以写在这里
# CSS的排版渲染合成
## 搜集元素进行

- 分行
  - 根据主轴尺寸，把元素分进行
  - 若设置了 no-wrap,则强行分配进第一行



## 计算主轴

- 计算主轴方向
  - 找出所有flex元素
  - 把主轴方向的剩余尺寸按比例分配给这些元素
  - 若剩余空间为负数，所有flex元素为 0，等比压缩剩余元素。



## 计算交叉轴

- 计算交叉轴方向
  - 根据每一行中最大元素尺寸计算行高
  - 根据行高 flex-align 和 item-align， 确定元素具体位置





## 绘制单个元素

-   绘制需要依赖 一个图形环境
-   与绘制相关的属性： background-color, border, background-image等



## 绘制DOM



# Flex盒子相关
# Flex 布局

```html
<div class="container">
    <div class="item">1</div>
    ...
</div>
```

所有学习背景以上述结构为主。

>   设为Flex布局之后，子元素的 `float`、`clear` 和 `vertical-align` 属性都将失效。



## 基本概念!



-   main axis --- flex盒子的主坐标是flex元素排列的基本的坐标方向。但是，并不一定是水平方向的，它依赖于 `flex-direction`属性的值
-   main-start | main-end --- flex元素被放置在从 main-start位置开始到 main-end 结束的flex盒子中。
-   main size ---  对于flex元素在主坐标上的宽或者高度就是它的主尺寸
-   cross axis --- 垂直于主坐标方向



## 属性

### flex 容器的属性

给容器设定 `display: flex;`后，容器可以拥有的属性

>   flex-direction
>
>   flex-wrap
>
>   flex-flow
>
>   justify-content
>
>   align-items
>
>   align-content



#### flex-direction

决定主轴的方向

flex-direction:    row （默认）| row-reverse | column | column-reverse



#### flex-warp

决定是否换行

flex-wrap:      nowrap（默认） | wrap | wrap-reverse;



wrap-reverse 属性 让第一行在容器副轴方向最下方按主轴方向排列，最后一行在副轴方向最上方按主轴方向排列



#### flex-flow

该属性为 `flex-direciton` 和 `flex-wrap` 的简写形式，默认值为 `row nowrap`

flex-flow:        <flex-direction>  <flex-wrap>



#### justify-content

定义了项目在主轴上的对齐方式

```css
.container{
    justify-content: 
        flex-start | （默认），主轴方向起始位置对齐
        flex-end | 主轴方向终点位置对齐
        center | 居中
        space-between | 两端对齐，项目之间的间隔相等，两边没空间
        space-around; 两端对齐，项目之间间隔相等，且两端的各自空间为元素之间间隔空间的一半
}
```



#### align-items

定义项目在交叉轴上如何对齐，与justify-content 类似

```css
.container{
	align-items: 
        flex-start | 
        flex-end | 
        center | 
        baseline | 项目的第一行文字的基准线对齐
        stretch(默认);对于已经规定了高度或者宽度的元素无效
}
```



#### align-content

**定义了多跟轴线的对齐方式。如果项目只有一根轴线，该属性不起作用**

```css
.box {
  align-content: 
      flex-start | 
      flex-end |
      center | 
      space-between | 
      space-around | 
      stretch;默认值，轴线占满整个交叉轴
}
```





### flex元素的属性

>   order
>
>   flex-grow
>
>   flex-shrink
>
>   flex-basis
>
>   flex
>
>   align-self



#### order

定义项目的排列顺序。数值越小，排列越靠前，默认为0



#### flex-grow

定义项目的放大比例，默认为0

即定义项目对于元素所在的该行中剩余空间的占用比例，设定后该元素的对应的宽度/高度失效



#### flex-shrink

定义了项目的缩小比例。默认为1

如果其中一个项目该属性为0，其余都为1，则空间不足时，前者不缩小。

即定义项目对于没有足够空间的情况的缩小程度。



#### flex-basis

定义了在分配空间之前，项目占据的主轴空间。默认值为 auto

浏览器根据这个属性，计算主轴是否有多余空间。



#### flex

flex属性是 flex-grow, flex-shrink 和 flex-basis 的简写。

默认值为 0 1 auto;

建议优先使用该属性，而不是分开写三个分离的属性。

该属性有两个快捷值 auto(1 1 auto) 和 none(0 0 auto)

```css
.item {
  flex: 
      none |
      [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]
}
```



#### align-self

该属性允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性。

默认值为auto，表示继承父元素的 align-items 属性，如果没有父元素，则等同于 stretch。

