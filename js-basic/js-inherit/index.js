
// 触发事件,waits秒后，不再触发事件,才执行
// 先清楚掉前面的定时器 再执行

function debounce(func, wait) {
    var timeout;
    return function () {
        clearTimeout(timeout)
        timeout = setTimeout(func, wait)
    }
}

container.onmousemove = debounce(getUserAction, 1000)

// 节流
// 持续触发事件,每隔一段时间,只执行一次事件。

function throttle(func, wait) {
    var timeout;
    var previous = 0;
    return function () {
        context = this;
        args = arguments;
        if (!timeout) {
            timeout = setTimeout(function () {
                timeout = null;
                func.apply(context, args)
            }, wait)
        }
    }
}




async function foo() {
    console.log(1)
    let a = await 100
    console.log(a)
    console.log(2)
}
console.log(0)
foo()
console.log(3)

// foo() 启动foo协程
// console.log(1)
// new Promise((resolve,reject)=>{resolve(300)})
// await 暂停foo协程,并将promise_ 返回给父协程  promsie_.then console.log(3)

// 执行微任务 当执行到微任务列表中 resolve(100),promise_then()设置的回调被激活
// 将resolve的值-> foo协程  并暂停父协程的执行  把控制权交给foo协程。

// async 函数中 await 后面的代码 需要等到 父协程执行完，开始执行 await生成的微任务时,发生 父协程暂停执行权 把控制权交给 foo协程,也就会执行 await后续代码

// await后面 直接跟一个变量 await 1  promise.then(await 下面代码) 并跳出 async
// 当遇到 promsie 函数时, promise.then()

// 当遇到异步函数  执行完 await代码 直接跳出 async1 执行其他代码
// 其他代码执行完毕后, 需要回到async1函数出执行剩下的代码, 然后把 await 代码注册到微任务队列

console.log('script start')

async function async1() {
    await async2()
    console.log('async1 end')
}
async function async2() {
    console.log('async2 end')
}
async1()

setTimeout(function () {
    console.log('setTimeout')
}, 0)

new Promise(resolve => {
    console.log('Promise')
    resolve()
})
    .then(function () {
        console.log('promise1')
    })
    .then(function () {
        console.log('promise2')
    })

console.log('script end')

// script start
// async2 end
// Promise
// script end
// promise1
// promise2
// async1 end