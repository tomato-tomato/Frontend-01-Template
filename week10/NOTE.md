# 每周总结可以写在这里
## Range API

```js
var range = new Range();
range.setStart(element, 9);
range.setEnd(element,4);


var range = document.getSelection().getRangeAt(0);
```

```js
range.setStartBefore
range.setEndBefore
range.setStartAfter
range.setEndAfter

range.selectNode
range.selectNodeContents(element); //选取节点内的内容
```

```js
var fragment = range.extractContents();//提取range内的内容，返回类型为 document-fragment
range.inserNode(document.createTextNode("aaaa"))
```


## Rules

```js
document.styleSheets[0].cssRules
document.styleSheets[0].insertRule("p{color:pink;}", 0)
document.styleSheets[0].removeRule(0)
```

- CSSStyleRule
  - selectorText String
  - style K-V结构



## getComputedStyle

- window.getComputedStyle(ele, pseudoElt)
  - elt 想要获取的元素
  - pseudoElt 可选，伪元素



## CSSOM视图

```js
let childWindow = window.open("about:blank", "_blank", "width=100,height=100,top=100,left=100");

childWindow.moveBy(-50, -50);
childWindow.resizeBy(50, 50);

childWindow.moveTO(50, 50);
childWindow.resizeTO(50, 50);
```



```js
window.scrollX
window.scrollY
window.scroll
windwo.scrollBy

//对于元素
$0.scrollBy(30,30)
$0.scrollTo
$0.scrollTOp
$0.scrollHeight //元素中滚动的高度
$0.getClientRects()

$0.getBoundingClientRect()
```





```js
//窗口视口的 宽高
window.innerHeight
window.innerWidth
document.documentElement.getBoundingClientRect();

window.devicePixelRatio
```