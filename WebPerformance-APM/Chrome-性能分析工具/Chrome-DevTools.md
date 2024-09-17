# Elements 
# Console
# Sources
# NetWork
* 下载信息概要中,DOMContentLoaded Load
    - DOMContentLoaded  说明网页已经构建好dom了,意味着构建dom所需要的html js css 都已经下载完毕了。
    - Load 说明浏览器已经加载了所有资源 (图像 样式表等)
* 详细信息
* 单个资源的时间线
    - 重定向 Redirect  查找缓存 DNS  建立TCP  发出请求Request  回复请求头 Response Header   是否重定向    
    - 优化时间线上耗时项
        - 排队 Queuing 时间过久  大概率是由浏览器为每个域名最多维护6个连接导致的。 域名分片技术   HTTP2.0已经没有没有每个域名最多维护6个TCP连接的限制了。
    - 第一字节时间 TTFB 时间过久
        - 服务器生成页面数据的时间过久。
        - 网络原因
        - 发送请求头带上了多余的用户信息。
    - Content Download 时间过久   
        - 减少文件大小 压缩 去掉源码中不必要的注释方法。 
# Performance
# Memory
# Application
# Security
# Audits
# Layers