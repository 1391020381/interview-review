# 浏览器提供了一系列强大的API，能够帮助我们进行错误捕获与性能监控：
## 错误监控
* Window.onerror：它是一个全局的事件处理器，用来捕获在代码执行过程中发生的运行时错误。
* window.addEventListener('error')：类似于onerror，但它更强大。不仅可以捕获到JS运行时错误，还能捕获到网络请求错误等其他错误。
* Window.onunhandledrejection：这是一个全局事件处理器，它用于处理Promise中未捕获的错误。
* window.addEventListener('unhandledrejection')：用来监听未处理的Promise拒绝。
## 性能监控
* Navigation Timing API：用于收集关于导航和页面加载的性能数据。可以通过window.performance.timing来获取。
* Resource Timing API：用于收集资源加载的相关性能数据。可以通过window.performance.getEntriesByType('resource')来获取。
* Performance Observer API：这个API，允许你订阅特定的性能事件，并通过回调函数对事件进行处理。我们能够很方便的进行性能统计。
* User Timing API：这个API，允许开发者创建自定义的性能时间线标记点，包括标记点之间的间隔。在window.performance对象上可用。
* Paint Timing API：用于收集绘制相关的性能数据。
* 除此以外，你还可以使用window.performance.now()来获取一个精准的、以毫秒为单位的时间戳，可以用来进行精准的性能计算。
* 这些API为我们提供了一个强大的工具箱，可以帮助我们收集、分析浏览器的性能数据，以便我们进行性能优化。建议边用边学，通过阅读MDN文档和相关性能监控的文章，获取更多的信息。同时也可以考虑使用一些现成的错误监控和性能分析的库，如Sentry，Webpack Bundle Analyzer等。