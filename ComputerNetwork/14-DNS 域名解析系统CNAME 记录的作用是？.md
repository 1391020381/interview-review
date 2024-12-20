


# CNAME
* CNAME（Canonical Name Record）用于定义域名的别名，如下面这条 DNS 记录：

```

; 定义www.example.com的别名

a.example.com.          IN     CNAME   b.example.com.


```

* 当你想把一个网站迁移到新域名，旧域名仍然保留的时候；还有当你想将自己的静态资源放到 CDN 上的时候，CNAME 就非常有用。




* DNS（域名系统）工作在互联网协议群的应用层。
互联网协议群通常分为四层，由低到高依次为：网络接口层、网络层、传输层和应用层。
网络接口层：主要处理网络硬件部分及驱动程序，如网络接口卡等。
网络层：主要包含IP协议，负责数据包的分割与合并以及路由选择等。
传输层：定义了端到端的连接规则，主要包括TCP和UDP协议。
应用层：最接近用户的一层，包括像HTTP、SMTP、FTP和DNS等用户可以直接使用的协议。
DNS主要用于将用户可读的域名解析为机器可识别的IP地址，这个过程是在应用层进行的。然而，DNS的查询请求和响应消息是通过传输层的UDP或TCP协议来传递的。通常，大部分DNS查询使用UDP协议，但当回复信息超过512字节或查询者需要较高可靠性时，也可能会使用TCP协议。


* DNS 域名解析过程
    - 递归查询  m.xyz.com -> 本地域名服务器 -> 根域名服务器  -> 顶级域名服务器  -> 权限服务器
    - 迭代查询 
        - m.xyz.com -> 本地域名服务器 -> 根域名服务器
        - 本地域名服务器 ->  顶级域名服务器  
        - 本地域名服务器 -> 权限域名服务器
