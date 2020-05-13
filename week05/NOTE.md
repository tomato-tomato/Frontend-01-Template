# 每周总结可以写在这里

## 从URL到显示页面大致流程

HTTP请求 =》 DOM树构建	=》 CSS 计算  =》 渲染	=》 合成  =》绘制

这些都是流式处理前一步的产出，即不需要等到上一步完全结束，就开始处理上一步的输出，所以我们在浏览网页时，才会看到逐步出现的页面。

## HTTP协议

HTTP协议是基于 TCP协议出现的。HTTP 在 TCP 的基础上， 规定来 Request-Response 的模式。这个模式决定了通讯必定是由浏览器端首先发起的。



HTTP 是纯粹的文本协议，它规定来使用 TCP 协议来传输文本格式的一个应用层协议。

### HTTP Method方法

有如下定义：

- GET	浏览器地址访问都是get
- POST  表单提交
- HEAD  只返回请求头
- PUT  添加资源
- DELETE  删除资源
- CONNECT  用于HTTPS 和 WebSocket
- OPTIONS  用于调试
- TRACE  用于调试

HTTP Status code(状态码) 和 Status text(状态文本)

### 常见状态码：

- 1xx： 临时回应，表示客户端请继续
- 2xx：请求成功
  - 200：请求成功
- 3xx：表示请求的目标有变化，希望客户端进一步处理
  - 301&302：永久性与临时性跳转
  - 304：客户端缓存没有更新。客户端本地有缓存且发现服务器没有更新，则返回一个不含body的304状态
- 4xx：客户端请求错误
  - 403：无权限
  - 404：表示请求页面不存在
  - 418：这是一个彩蛋，来自ietf 的一个愚人节玩笑
- 5xx：服务端请求错误
  - 500：服务端错误
  - 503：服务端暂时性错误，可以一会儿再试

### HTTP Head（HTTP 头）

[HTTP headers](./request-response_header.md)

### HTTP Request Body

-   application/json
-   application/x-www-form-urlencoded      表单提交
-   multipart/form-data    文件上传
-   text/plaint