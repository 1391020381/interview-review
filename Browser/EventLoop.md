 * 每一个渲染进程都有一个主线程,并且线程非常繁忙,既要处理DOM,又要计算样式,还要处理布局,同时还需要处理JS任务以及各种输入事件。
 * 要让这么多不同类型的任务在主线程中有条不紊地执行,这就需要一个系统来统筹调度这些任务,这个统筹调度系统就是  消息队列 和事件循环系统。