* [Chrome 开发工具 Performance 使用实战](https://github.com/Sanotsu/web-beginner/blob/master/documents/11-others/web-base-chrome-performance-devtool.md)
    - 无痕模式 避免插件影响分析
    - 时间线  CPU 网络 堆
    - 概览
    - 总结  调用栈  事件日志

    - 加载性能 / 运行性能
    - 寻找分析的时间线  标红  可以拖动时间线的 滑动筛选器
    - main 任务  点击 标红的  调用栈/ 事件日志  bottom-up  右侧点击源码 -> 可以观察到每个js执行时间
    - sourcemap    Enable JavaScript source maps

* [代码手动关联 sourcemap](https://juejin.cn/book/7070324244772716556/section/7071922380695666727#heading-5)

* 单个文件的时间线
    - Queuing  
        - 域名分片   HTTP/1.1 浏览器为每个域名最多维护6个链接。 
        - 站点升级HTTP2  HTTP2已经没有每个域名最多维护6个TCP链接的限制了。
    - Stalled
    - Initial connection/SSL
    - Request sent
    - TTFB
        - 服务器生成页面数据的时间过久   缓存技术 redis
        - 网络的原因    CDN
        - 发送请求头带上了多余的用户信息。   加大了服务器处理时间  减少 不必要Cookie信息
    - Content Download
        - 单个文件 Content Download话费大量时间，有可能字节数太多的原因导致的。  压缩 去掉注释

* Web性能
    - 页面加载阶段
    - 页面交互阶段

* Performance
    -  录制并重新加载 当你 录制加载 阶段的性能数据时, Performance 会重新渲染加载页面,并等到页面完全渲染出来后,Performance就会自动停止录制。
    - 录制 如果 录制交互阶段 的性能时,那么需要手动停止录制过程。

* Network
* Timings
* Frames指标
* Interactions指标  用来记录用户交互操作  比如 点击鼠标 输入文字等交互信息。
* Main 指标
    - 一段段横条代表执行一个个任务 任务越长，话费的时间越多。
    - 竖向代表该任务的执行记录。
    - 渲染流水线的大部分流程  js执行  V8垃圾回收  定时器设置的回调任务。

* 详情面板    
    - 一个长条和多个竖条组成图形。通过上面的图形我们只能得到一个大致的信息




* Network
    - domcontentload 
    - load
    - 分析耗时较长资源 时间  timing

* Performance
    - 