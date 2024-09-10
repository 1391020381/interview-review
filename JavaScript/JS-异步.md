* 为了协调这些任务有条不紊地在主线程上执行，页面进程引入了消息队列和事件循环机制，渲染进程内部会维护多个消息队列，比如延迟执行队列和普通的消息队列。然后主线程采用一个 for 循环，不断地从这些任务队列中取出任务并执行任务。我们把这些消息队列中的任务称为`宏任务`。
    - 渲染事件（如解析 DOM、计算布局、绘制）；
    - 用户交互事件（如鼠标点击、滚动页面、放大缩小等）；
    - JavaScript 脚本执行事件；
    - 网络请求完成、文件读写完成事件。
* `微任务`就是一个需要异步执行的函数，执行时机是在主函数执行结束之后、当前宏任务结束之前。
    - 使用 Promise，当调用 Promise.resolve() 或者 Promise.reject() 的时候，也会产生微任务。
    - MutationObserver 监控某个 DOM 节点
* 在当前宏任务中的 JavaScript 快执行完成时，也就在 JavaScript 引擎准备退出全局执行上下文并清空调用栈的时候，JavaScript 引擎会检查全局执行上下文中的微任务队列，然后按照顺序执行队列中的微任务。WHATWG 把执行微任务的时间点称为检查点


# Promise
1. Promise 中为什么要引入微任务？
2. Promise 中是如何实现回调函数返回值穿透的？
3. Promise 出错后，是怎么通过“冒泡”传递给最后那个捕获异常的函数？

* Promise 状态机



# async/await


## 生成器 VS  协程
* 生成器函数是一个带星号函数，而且是可以暂停执行和恢复执行的

```
function* genDemo() {
    console.log("开始执行第一段")
    yield 'generator 2'

    console.log("开始执行第二段")
    yield 'generator 2'

    console.log("开始执行第三段")
    yield 'generator 2'

    console.log("执行结束")
    return 'generator 2'
}

console.log('main 0')
let gen = genDemo()
console.log(gen.next().value)
console.log('main 1')
console.log(gen.next().value)
console.log('main 2')
console.log(gen.next().value)
console.log('main 3')
console.log(gen.next().value)
console.log('main 4')

```
* ![协程执行流程图](https://static001.geekbang.org/resource/image/5e/37/5ef98bd693bcd5645e83418b0856e437.png?wh=1142*497)

* 在 JavaScript 中，生成器就是协程的一种实现方式


```

//foo函数
function* foo() {
    let response1 = yield fetch('https://www.geekbang.org')
    console.log('response1')
    console.log(response1)
    let response2 = yield fetch('https://www.geekbang.org/test')
    console.log('response2')
    console.log(response2)
}

//执行foo函数的代码
let gen = foo()
function getGenPromise(gen) {
    return gen.next().value
}
getGenPromise(gen).then((response) => {
    console.log('response1')
    console.log(response)
    return getGenPromise(gen)
}).then((response) => {
    console.log('response2')
    console.log(response)
})


```
* 协程与Promise相互配合的大致流程
1. 首先执行的是let gen = foo()，创建了 gen 协程。
2. 然后在父协程中通过执行 gen.next 把主线程的控制权交给 gen 协程。
3. gen 协程获取到主线程的控制权后，就调用 fetch 函数创建了一个 Promise 对象 response1，然后通过 yield 暂停 gen 协程的执行，并将 response1 返回给父协程。
4. 父协程恢复执行后，调用 response1.then 方法等待请求结果。
5. 等通过 fetch 发起的请求完成之后，会调用 then 中的回调函数，then 中的回调函数拿到结果之后，通过调用 gen.next 放弃主线程的控制权，将控制权交 gen 协程继续执行下个请求。



* 执行生成器代码的函数称为执行器
* co 执行器的原理

```

// 模拟 co 函数的实现
function co(generatorFunc) {
  return function () {
    const generator = generatorFunc.apply(this, arguments);

    function handle(result) {
      if (result.done) return Promise.resolve(result.value);

      return Promise.resolve(result.value)
        .then(res => handle(generator.next(res)))
        .catch(err => handle(generator.throw(err)));
    }

    return handle(generator.next());
  };
}

// 示例生成器函数
function* myGenerator() {
  const result1 = yield Promise.resolve(1);
  console.log(result1); // 输出: 1

  const result2 = yield Promise.resolve(2);
  console.log(result2); // 输出: 2
}

// 使用 co 执行生成器函数
const wrappedGenerator = co(myGenerator);
wrappedGenerator();

```

* 生成器函数 作为参数 
* co 中利用 {done:true,value}  来判断 生成器是否执行完毕，执行完毕就返回 否则通过 Promise.then() 继续执行 generator.next()


* async 是一个通过异步执行并隐式返回 Promise 作为结果的函数。
* 对 async 函数的理解，这里需要重点关注两个词：异步执行和隐式返回 Promise。





```

async function foo() {
    console.log(1)
    let a = await 100
    console.log(a)
    console.log(2)
}
console.log(0)
foo()
console.log(3)


```
* ![async/await执行流程](https://static001.geekbang.org/resource/image/8d/94/8dcd8cfa77d43d1fb928d8b001229b94.png?wh=1142*508)
    - await 100 会默认创建一个 Promise 对象  let promise_ = new Promise((resolve,reject){resolve(100)})
    - promise_ 对象创建的过程中，我们可以看到在 executor 函数中调用了 resolve 函数，JavaScript 引擎会将该任务提交给微任务队列
    - 然后 JavaScript 引擎会暂停当前协程的执行，将主线程的控制权转交给父协程执行，同时会将 promise_ 对象返回给父协程。
    - 接下来继续执行父协程的流程，这里我们执行console.log(3)，并打印出来 3。随后父协程将执行结束，在结束之前，会进入微任务的检查点，然后执行微任务队列，微任务队列中有resolve(100)的任务等待执行，执行到这里的时候，会触发 promise_.then 中的回调函数
    - promise_.then((value)=>{  //回调函数被激活后 //将主线程控制权交给foo协程，并将vaule值传给协程})
    - foo 协程激活之后，会把刚才的 value 值赋给了变量 a，然后 foo 协程继续执行后续语句，执行完成之后，将控制权归还给父协程。