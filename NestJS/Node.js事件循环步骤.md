# Node.js事件循环主要分为以下六个阶段：
* 大体的task（宏任务）执行顺序是这样的:
1. timers定时器：本阶段执行已经安排的 setTimeout() 和 setInterval() 的回调函数。
2. pending callbacks待定回调：执行延迟到下一个循环迭代的 I/O 回调。
3. idle, prepare：仅系统内部使用。
4. poll 轮询：检索新的 I/O 事件;执行与 I/O 相关的回调（几乎所有情况下，除了关闭的回调函数，它们由计时器和 setImmediate() 排定的之外），其余情况 node 将在此处阻塞。
5. check 检测：setImmediate() 回调函数在这里执行。
6. close callbacks 关闭的回调函数：一些准备关闭的回调函数，如：socket.on('close', ...)。
* 重要的是，每个阶段完成后，Node.js会检查一次是否有pending的微任务（promise.resolve等），如果有，先处理这些微任务，然后再进入下一阶段。
还有一些使用特别需要注意的，就是process.nextTick方法，它是一个特殊的异步I/O方法。在任何I/O方法的回调函数被调用的前后，都能执行。换句话说，它的优先级是最高的。它不属于上述六个阶段中的任何一个，而是在每个阶段开始和即将结束的时候被调用。


* ![Node-EventLoop](https://s0.lgstatic.com/i/image6/M00/13/20/CioPOWBB1rCAM7NxAAFF-n4jMtY220.png)