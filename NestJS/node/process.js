// process是Nodejs操作当前进程和控制当前进程的API 并且挂载到 globalThis下面的全局API


console.log('process.arch:',process.arch)

// 返回当前的工作目录 例如在 F:\project\node 执行脚本就返回这个目录
// 也可以和path 拼接代替 __dirname 使用
console.log('process.cwd():',process.cwd())

// 获取执行进程后面的参数 返回时一个数组 

// node process.js --open --xm
console.log('process.argv:',process.argv)

// 获取当前进程的内存使用情况。 该方法返回一个对象，其中包含了各种内存使用指标
// 
console.log("process.memoryUsage():",process.memoryUsage())

var res = {
    rss: 30932992, // 常驻集大小 这是进程当前占用的物理内存量，不包括共享内存和页面缓存。它反映了进程实际占用的物理内存大小
    heapTotal: 6438912, //堆区总大小 这是 V8 引擎为 JavaScript 对象分配的内存量。它包括了已用和未用的堆内存
    heapUsed: 5678624,  //已用堆大小
    external: 423221, //外部内存使用量 这部分内存不是由 Node.js 进程直接分配的，而是由其他 C/C++ 对象或系统分配的
    arrayBuffers: 17606 //是用于处理二进制数据的对象类型，它使用了 JavaScript 中的 ArrayBuffer 接口。这个属性显示了当前进程中 ArrayBuffers 的数量
  }

  // 调用 process.exit() 将强制进程尽快退出,即使还有未完全处理完的异步操作挂起

  setTimeout(()=>{
    console.log('5')
  },5000)
  setTimeout(()=>{
    process.exit()
  },2000)


  process.on('exit',()=>{
    console.log('进程被退出')
  })

  // process.kill
  //  与 exit 类似 kill用来杀死一个进程 接受一个参数进程id 可以通过 process.pid获取。


  // process.env
  // 用于读取操作系统所有的环境变量，也可以修改和查询环境变量。

  process.env.JAVA_HOME = 'justdoit';

  console.log(process.env)

  // cross-env
  // 跨平台设置和使用环境变量
  // 同时，它提供了一个设置环境变量的脚本
  // "dev":"cross-env NODE_ENV=dev node index.js"
  // 原理 windows就调用 SET  posix 调用 export
  // set NODE_ENV=production  #windows
// export NODE_ENV=production #posix
