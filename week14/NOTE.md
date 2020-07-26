# 每周总结可以写在这里
## 对象与组件

### 对象

-   Properties（属性）
-   Methods（方法）
-   Inherit（继承）

### 组件

-   Properties（属性）
-   Methods（方法）
-   Inherit（继承）
-   Attribute
-   Config & Stete
-   Event
-   Lifecycle
-   Children



## 组件内部

-   State（状态）

-   Children



## 组件使用者跟组件作者交互的方式

-   Attribute
    -   组件使用者在标记语言中设置的内容，一般只允许字符串

-   Method

-   Property

-   Event
    -   通过事件将内部的部分传递出去



## Attribute vs Property

Attribute 强调描述性，能在标记语言中改变

Property 强调从属关系

````html
<input value="cute" />
<script>
	let input = document.getElementsByTagName("input")[0];
    //若property没有设置，则结果为attribute
    input.value // cute
    input.getAttribute('value')//cute
    
    input.value = "hello";
    //若修改了property属性，则property变化但 attribute不变
    input.value // hello
    input.getAttribute('value') //cute
    
    input.setAttribute("value", "hola");
    //若修改了attribute属性， property属性不变
    input.value // hello
    input.getAttribute("value") // hola
</script>

````



## 如何设计组件状态

|           | Markup set | JS  set | JS Change | User Input Change |
| --------- | :--------: | :-----: | :-------: | :---------------: |
| Property  |     ×      |    √    |     √     |        ？         |
| Attribute |     √      |    √    |     √     |        ？         |
| State     |     ×      |    ×    |     ×     |         √         |
| Config    |     ×      |    √    |     ×     |         ×         |




