* webworker



```

const worker = new Worker('worker.js')

worker.postMessage({data:'hello worker'})

worker.onmessage = function(event){
    console.log('Received message')
}
worker.onerror = function(error){
    console.log(error)
}

self.onmessage = function(event){
    console.log('Received message from main thread:', event.data);
  
  // 处理数据并发送回主线程
  const result = processData(event.data);
  self.postMessage({ result: result });
}
```

* 内部异常  try catch  postmessage 通信
* 定期发送心跳消息
    - 你可以在 Web Worker 中定期发送“心跳”消息到主线程，以表明它仍在运行。如果在一定时间内没有收到这些消息，主线程可以假定 Web Worker 已经挂了。
* 使用 terminate() 方法并监听 terminated 事件      worker.terminate(); // 主动终止 Web Worker
* 监听 error 事件
    - 在主线程中，可以为 Web Worker 实例添加 error 事件监听器。当 Web Worker 发生未捕获的异常时，会触发此事件。