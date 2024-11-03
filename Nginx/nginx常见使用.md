* [Nginx极简教程](https://dunwu.github.io/nginx-tutorial/#/nginx-quickstart)
* [Nginx 从入门到实践，万字详解](https://juejin.cn/post/6844904144235413512)
* Nginx的最重要使用场景
    - 静态资源服务 通过本地文件系统提供服务
    - 反向代理服务 延生出包括 缓存 负载均衡等
    - API服务 OpenResty

* 简单请求 与 非简单请求
    - 非简单请求是那种对服务器有特殊要求的请求  PUT DELETE  Content-Type 的值 application/json 
    - 浏览器会在正式通信之前,发送一次HTTP预检 OPTIONS请求,先询问服务器,当前网页所在域名是否在服务器的许可名单中,以及可以使用哪些HTTP请求头和头信息字段。只有得到肯定答复,浏览器才会发出正式的 XHR请求,否则报错。
* /etc/nginx/config.d 文件夹 是我们进行子配置的配置项存放处
* /etc/nginx/nginx.conf 主配置文件  默认把/etc/nginx/config.d文件夹中都引入
* /usr/share/nginx/html  通常静态文件夹都放在这个文件夹, 也可以根据习惯存放。


* nginx -s reload     向主进程发送信号 重新加载配置文件 热重启
* nginx -s reopen
* nginx -s stop
* nginx -s quit
* nginx -T    查看当前nginx最终配置
* nginx -t -c <配置路径>  检查配置是否有问题,如果在配置目录,则不需要-c。


* nginx.conf 结构图

main        # 全局配置，对全局生效
├── events  # 配置影响 Nginx 服务器或与用户的网络连接
├── http    # 配置代理，缓存，日志定义等绝大多数功能和第三方模块的配置
│   ├── upstream # 配置后端服务器具体地址，负载均衡配置不可或缺的部分
│   ├── server   # 配置虚拟主机的相关参数，一个 http 块中可以有多个 server 块
│   ├── server
│   │   ├── location  # server 块可以包含多个 location 块，location 指令用于匹配 uri
│   │   ├── location
│   │   └── ...
│   └── ...
└── ...



* upstream backend_servers {
    server 192.168.1.10:8080 max_fails=3 fail_timeout=10s;
    server 192.168.1.11:8080 max_fails=3 fail_timeout=10s;
}
* max_fails 表示在 fail_timeout 时间内最大的失败次数。如果超过这个次数，服务器将被标记为不可用，Nginx 会暂时停止向其发送请求，直到其恢复正常。