* HTTP是浏览器中最重要且使用最多的协议,是浏览器和服务器之间的通讯语言。

* DNS Prefetch是一种网络优化技术,它提前解析(也就是将一个域名转换为对应的IP地址)用户可能点击的链接,从而使用户时间点击时更快速的加载页面。例如 a.com 中 js css image 在 静态资源网站 可以使用 DNS Prefetch  
* html-webpack-plugin
* 由于Vite默认会使用项目根目录下的index.html作为模版,你需要在index.html头部位置添加对应的 dns-prefetch link  
* <!-- 添加预解析链接 --> <link rel="dns-prefetch" href="//cdn.example.com">
# 超文本传输协议 HTTP/0.9
* 主要用于学术交流 需求很简单 用来在网络之间传递HTML超文本的内容,所以被称为 超文本传输协议。
* 采用了基于请求响应的模式,从客户端发出请求,服务端返回数据。
## HTTP/0.9一个完整的请求流程
1. DNS 域名 解析称IP  因为 HTTP都是基于TCP协议的,所以客户端先要根据IP地址 端口 和服务器建立TCP连接,而建立连接的过程就是TCP协议三次握手的过程。
2. 建立好连接之后,会发送一个GET请求行的信息,如GET /index.html 用来获取index.html.
3. 服务端接受信息之后,读取对应的HTML文件,并将数据以ASCII字符串返回给客户端。
4. HTML 文档传输完成后，断开连接。