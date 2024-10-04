* [SSR](https://github.com/zhangyuang/ssr)

* vuessr reactssr 原理 优化  nuxtjs nextjs 使用 优化

* 自研 SSR
* SSR Multi-Page Application
* 首页SSR  
* a 标签跳转  目标页面  SSR(微服务)  -> 避免在一个大项目中不好维护
* nextjs  nuxtjs 


* 降级总结
1. 偶发性降级 -- 偶发的服务端渲染失败降级为客户端渲染；
2. 配置平台降级 -- 通过配置平台修改全局配置文件主动降级，比如双十一等大流量情况下，可提前通过配置平台将整个应用集群降级为客户端渲染；
3. 监控系统降级 -- 监控系统跑定时任务监控集群状态，集群资源占用达到设定CPU/内存阈值将整个集群降级or扩容；
4. 渲染服务集群宕机 -- ssr渲染可以理解为另外一种形式的BFF层，接口服务器与ssr渲染服务器是独立的，html的获取逻辑回溯到Nginx获取，此时触发客户端渲染。

* SSR ->  Nginx



# 常见问题
* reactssr vuessr 双端对比测试失败常见原因？

* react-dom.development.js:88 Warning: Did not expect server HTML to contain the text node "
    - 这个警告没关系，服务端直出的时候组件内标签不要有空格