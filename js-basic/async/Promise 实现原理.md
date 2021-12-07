# new Promise() 
1. 传入一个函数 fn(resolve,reject)
2. Promise 构造函数执行 fn 异步函数    Promise/A+ 规范明确要求回调需要通过异步方式执行,用以保证一致可靠的执行顺序。
3. then 传入回调函数
4. 在 resolve中增加定时器,通过setTimeout机制,将resolve中执行回调的逻辑放置在JS任务队列末尾,以保证resolve执行时 then 方法的 onFulfilled已经注册完成。
5. 避免 通过 setTimeout(()=>{ p.then(tip=>{console.log('then3',tip)}) }) 无法被执行 需要增加状态机
6. 链式调用的实现只是在then中return 了 this. 因为是同一个实例,调用再次then也只能返回相同结果。
7. then 返回的一定是一个新的Promsie实例




# 基本实现
1. 构造Promise-1实例,立即执行 mockAjax('getUserId',callback)
2. 调用Promsie-1的then方法,注册Promise-1的onFulfilled函数
3. then 函数内部构造了一个新的Promsie实例:Promise-2。立即执行Promise-1的_handle 方法
4. 此时Promise-1还是pending的状态
5. Promsie-1._handle中就把注册在Promsie-1的onFulfilled和Promise-2的resolve保存在 Promise-1内部的callbacks
6. 至此当前线程执行结束。返回的是Promise-2的Promise实例
7. 1s后,异步请求返回,要求改变Promise-1的状态和结果,执行resolve(result)
8. Promsie-1的值被改变,内容为异步请求返回结果:'getUserId异步请求耗时1s'
9. Promsie-1的状态变成fulfilled
10. Promise-1的 onFulfilled被执行,打印出了 'getUserId异步请求耗时1s'
11. 然后再调用Promsie-2.resolve
12. 改变Promise-2的值和状态,因为Promise-1的onFfulfilled没有返回值,所以Promise-2的值为undefined