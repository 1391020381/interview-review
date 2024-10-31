// child_process 子进程 https://juejin.cn/post/7277045020422930488
// 创建子进程
// spawn 执行命令
// exec 执行命令
// execFile 执行可执行文件
// fork 创建node子进程
// execSync 执行命令 同步执行
// execFileSync 执行可执行文件 同步执行
// spawnSync 执行命令 同步执行

// spawn 用于执行一些实时获取的信息因为spawn返回的是流边执行边返回，exec是返回一个完整的buffer，buffer的大小是200k，如果超出会报错，而spawn是无上限的。


// spawn在执行完成后会抛出close事件监听，并返回状态码，通过状态码可以知道子进程是否顺利执行。exec只能通过返回的buffer去识别完成状态，识别起来较为麻烦

// exec是底层通过execFile实现 execFile底层通过spawn实现


// for 场景适合大量的计算 或者容易阻塞主进程操作的一些代码 就适合开发 fork

const { fork,spawn,execFile,exec,execFileSync,execSync,spawnSync }  = require('child_process')
const path = require('path')
// execFile 

execFile(path.resolve(process.cwd(),'./bat.cmd'),null,(err,stdout)=>{
    console.log(stdout.toString())
})


const { stdout }  = spawn('netstat',['-an'],{})

// 返回的数据用data事件接受

stdout.on('data',(steram)=>{
    console.log(steram.toString())
})


// fork
const testProcess = fork('./test.js');

testProcess.send('我是主进程');

testProcess.on("message",(data)=>{
    console.log('我是主进程接受消息111:',data)
})