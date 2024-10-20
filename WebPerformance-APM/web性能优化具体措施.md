
# 加载性能

* TTFB(Time To First Byte)  800ms  1800ms
    - 纯静态页面或 SPA  ->  oss -> cdn  其 99%以上的TTB指标应该低于800毫秒甚至更少。
    - SSR  读取接口数据  DOM生成
    - 尝试统计 TTFB 指标的平均值、最小值、最大值，以及第 60 百分位、75 百分位、90 百分位以及 99 百分位。
    - CDN   CDN服务商提供的主动更新能力。每次发布新版本后,我们可以通过某中方式主动发送请求,通知CDN节点更新前端资源。
    - HTTP2.0  多路复用允许浏览器单个TCP链接上同时发送多个请求和响应。解决HTTP1.x 头阻塞问题,提高资源请求的并发性能。
    - 优化资源大小  
        - treeshaking  
        - js文件拆分和动态加载  splitchunk  动态加载  异步组件   
        - img压缩 格式(管理后台限制资源大小) 
        - web-worker
        - 预解析和预链接 dns-prefetch  preconnect    验证
        - Gzip压缩文件

        - 服务端处理  优化接口请求  使用缓存服务 减少重定向 服务器硬件配置
    - 白屏
        - 我们可以得出一个结论，白屏时间近似等于 FCP 时间。而 FCP 时间是由首字节时间（TTFB）和浏览器绘制时间组成的。
        - pwa  app预加载 
    - 字体
        - fontmin
        - WOFF2
        - font-display 属性用于指定 font-face 在样式中的显示策略，总共有 5 种策略，分别是 auto、block、swap、fallback、optional。
        - swap、optional、fallback 三个值在自定义字体还未准备好时，让浏览器使用系统默认字体。
    - 图片  webp  picture   icon(小于5kb) ->iconfont.cn
    - CLS
        - 图片尺寸   width height
        - 动态内容    第三方分析   wrapper的宽度固定
        - 我们应在网页的整个生命周期里，避免使用 CSS 改变元素的大小和位置，尽量使用 transform 属性替代。
        -  
# 运行性能
* * 需要通过开发者工具分析，找出问题根源并提出解决方案。不过，无论前端用的是哪种框架，只要有性能问题或交互卡顿，一定是前端业务逻辑导致，绝不会是底层问题。
* 优化布局和渲染
    - DOM大小 DOM深度
    - 减少无用层级
    - 只渲染可视区内容
        - 分页 懒加载
        - 虚拟化列表。       
* INP 
    - Performance -> longtask
    - 宏任务 微任务
    - Settimeout
    - Promise.then()
    - requestAnimationFrame   动画
    - requestIdleCallback     埋点上报