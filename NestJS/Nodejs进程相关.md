* child_process 子进程 https://juejin.cn/post/7277045020422930488
    - 创建子进程
    - spawn 执行命令
    - exec 执行命令
    - execFile 执行可执行文件
    - fork 创建node子进程
    - execSync 执行命令 同步执行
    - execFileSync 执行可执行文件 同步执行
    - spawnSync 执行命令 同步执行

* spawn 用于执行一些实时获取的信息因为spawn返回的是流边执行边返回
* exec是返回一个完整的buffer，buffer的大小是200k，如果超出会报错，而spawn是无上限的。


 * spawn在执行完成后会抛出close事件监听，并返回状态码，通过状态码可以知道子进程是否顺利执行。
 * exec只能通过返回的buffer去识别完成状态，识别起来较为麻烦

* exec是底层通过execFile实现 execFile底层通过spawn实现


* for 场景适合大量的计算 或者容易阻塞主进程操作的一些代码 就适合开发 fork


* Cluster
    - 用于在多核系统上创建多个nodejs进程,以充分利用系统的所有的CPU核心,从而提高应用的性能和可用性。
* cluster 的原理，总结一下就是 cluster 模块应用 child_process 来创建子进程，子进程通过复写掉 cluster._getServer 方法，从而在 server.listen 来保证只有主进程监听端口，
* 主子进程通过 IPC 进行通信，其次主进程根据平台或者协议不同，应用两种不同模块（round_robin_handle.js 和 shared_handle.js）进行请求分发给子进程处理。接下来我们看一下 cluster 的成熟的应用工具 PM2 的应用和原理。