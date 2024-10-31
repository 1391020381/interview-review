// Cluster
// 用于在多核系统上创建多个nodejs进程,以充分利用系统的所有的CPU核心,从而提高应用的性能和可用性。

// cluster 的原理，总结一下就是 cluster 模块应用 child_process 来创建子进程，子进程通过复写掉 cluster._getServer 方法，从而在 server.listen 来保证只有主进程监听端口，
// 主子进程通过 IPC 进行通信，其次主进程根据平台或者协议不同，应用两种不同模块（round_robin_handle.js 和 shared_handle.js）进行请求分发给子进程处理。接下来我们看一下 cluster 的成熟的应用工具 PM2 的应用和原理。
const cluster = require('node:cluster')
const http = require("node:http")
const os = require("node:os");

const cpus = os.cpus().length
// 主进程
if (cluster.isPrimary) {
    for (let i = 0; i < cpus; i++) {
        cluster.fork() // 创建子进程
    }
}
// 子进程
else {
   http.createServer((req, res) => {
        res.writeHead(200)
        res.end('cluster is running')
    }).listen(3000,()=>{
        console.log('http://127.0.0.1:3000')
    })
}

