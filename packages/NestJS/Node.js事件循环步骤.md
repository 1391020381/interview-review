# Node.js事件循环主要分为以下六个阶段：
1. timers阶段：这一阶段用于处理定时器回调函数，如setTimeout和setInterval。
2. I/O callbacks阶段：处理大部分的I/O回调。
3. idle, prepare阶段：仅node内部使用，用于处理新的I/O事件。
4. poll阶段：用于等待新的IO事件，执行对应的回调。
5. check阶段：setImmediate会在这个阶段被调用。
6. close callbacks阶段：处理如socket的关闭事件等。
* 重要的是，每个阶段完成后，Node.js会检查一次是否有pending的微任务（promise.resolve等），如果有，先处理这些微任务，然后再进入下一阶段。
还有一些使用特别需要注意的，就是process.nextTick方法，它是一个特殊的异步I/O方法。在任何I/O方法的回调函数被调用的前后，都能执行。换句话说，它的优先级是最高的。它不属于上述六个阶段中的任何一个，而是在每个阶段开始和即将结束的时候被调用。