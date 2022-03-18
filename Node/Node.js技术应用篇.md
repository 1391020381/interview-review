# 系统稳定：如何监控和保护进程安全？

## Node.js进程安全
* Node.js，由于一个用户的异常访问或者数据异常，加上没有做好异常处理和安全保护，直接导致了整个 Node.js 服务重启了，从而中断了所有人的请求，用户体验非常差
* 要尽可能地在最小处进行安全保护

## 哪些场景会导致 Node.js异常
1. 由于js的弱类型，引发代码逻辑异常导致进程异常退出
2. 内存使用不当
3. I/O句柄没有及时释放。


### 代码逻辑
1. null.property
    - lodash get
2. parameters error JSON.parse (try catch)  fs  require    
3. other errors  Promise.then.cath(err)  Socket.on() let var 
4. 内存泄漏 句柄泄露  网络模块泄漏 

# 监控告警介绍
1. 自动定时采集进程的指标数据；

2. 接口被调用或者访问后主动上报的信息

* NodeJS运维: 从 0 开始 Prometheus + Grafana 业务性能指标监控 #21
https://github.com/SunshowerC/blog/issues/21

## 监控指标
1. 事件延迟  如果主线程被长时间占用，导致事件延迟 。 可以通过 setTimeout来判断
2. CPU使用率  发现CPU使用率长期维持在70%上 考虑扩容 或增加进程
3. 内存变化  
4. 句柄变化 
5. 进程异常重启次数


* 业务响应速度
1. 接口名称
2. 接口请求时服务器时间
3. 接口请求用户分类标识
4. 接口请求耗时
5. 当前服务器ip

# 内存检查：多种类型的内存泄漏分析方案