// 解决回调地狱    回调函数延迟绑定  Promise 穿透到外层
// Promie.all  
// Promise.allSettled 参数不论返回结果是否成功,都返回每个参数执行状态
// Promise.any  参数中只要有一个成功,就返回该成功的执行结果
// Promise.race 顾名思义 返回最先返回执行成功的参数的执行结果。
// Promise 状态具有凝固性
// Promise 错误处理
// Promise 实例添加多个 then 处理
// .then 链式调用    then 方法中 pending rejected fulfilled 可以创建一个新的 promise2用以返回
// Promise穿透实现
// 静态方法实现
function Promise(executor) {
    this.status = 'pending'
    this.value = null
    this.reason = null
    this.onFulfilledArray = []
    this.onRejectedArray = []
  
    const resolve = value => {
      if (value instanceof Promise) {
        return value.then(resolve, reject)
      }
      setTimeout(() => {
        if (this.status === 'pending') {
          this.value = value
          this.status = 'fulfilled'
  
          this.onFulfilledArray.forEach(func => {
            func(value)
          })
        }
      })
    }
  
    const reject = reason => {
      setTimeout(() => {
        if (this.status === 'pending') {
          this.reason = reason
          this.status = 'rejected'
  
          this.onRejectedArray.forEach(func => {
            func(reason)
          })
        }
      })
    }
  
  
      try {
          executor(resolve, reject)
      } catch(e) {
          reject(e)
      }
  }
  
  const resolvePromise = (promise2, result, resolve, reject) => {
    // 当 result 和 promise2 相等时，也就是说 onfulfilled 返回 promise2 时，进行 reject
    if (result === promise2) {
      return reject(new TypeError('error due to circular reference'))
    }
  
    // 是否已经执行过 onfulfilled 或者 onrejected
    let consumed = false
    let thenable
  
    if (result instanceof Promise) {
      if (result.status === 'pending') {
        result.then(function(data) {
          resolvePromise(promise2, data, resolve, reject)
        }, reject)
      } else {
        result.then(resolve, reject)
      }
      return
    }
  
    let isComplexResult = target => (typeof target === 'function' || typeof target === 'object') && (target !== null)
    // 如果返回的是疑似 Promise 类型
    if (isComplexResult(result)) {
      try {
        thenable = result.then
        // 如果返回的是 Promise 类型，具有 then 方法
        if (typeof thenable === 'function') {
          thenable.call(result, function(data) {
            if (consumed) {
              return
            }
            consumed = true
  
            return resolvePromise(promise2, data, resolve, reject)
          }, function(error) {
            if (consumed) {
              return
            }
            consumed = true
  
            return reject(error)
          })
        }
        else {
          return resolve(result)
        }
  
      } catch(e) {
        if (consumed) {
          return
        }
        consumed = true
        return reject(e)
      }
    }
    else {
      return resolve(result)
    }
  }
  
  Promise.prototype.then = function(onfulfilled, onrejected) {
    onfulfilled = typeof onfulfilled === 'function' ? onfulfilled : data => data
    onrejected = typeof onrejected === 'function' ? onrejected : error => {throw error}
  
    // promise2 将作为 then 方法的返回值
    let promise2
  
    if (this.status === 'fulfilled') {
      return promise2 = new Promise((resolve, reject) => {
        setTimeout(() => {
          try {
            // 这个新的 promise2 resolved 的值为 onfulfilled 的执行结果
            let result = onfulfilled(this.value)
            resolvePromise(promise2, result, resolve, reject)
          }
          catch(e) {
            reject(e)
          }
        })
      })
    }
    if (this.status === 'rejected') {
      return promise2 = new Promise((resolve, reject) => {
        setTimeout(() => {
          try {
            // 这个新的 promise2 reject 的值为 onrejected 的执行结果
           let result = onrejected(this.reason)
           resolvePromise(promise2, result, resolve, reject)
          }
          catch(e) {
            reject(e)
          }
        })
      })
    }
    if (this.status === 'pending') {
      return promise2 = new Promise((resolve, reject) => {
        this.onFulfilledArray.push(value => {
          try {
            let result = onfulfilled(value)
            resolvePromise(promise2, result, resolve, reject)
          }
          catch(e) {
            return reject(e)
          }
        })
  
        this.onRejectedArray.push(reason => {
          try {
            let result = onrejected(reason)
            resolvePromise(promise2, result, resolve, reject)
          }
          catch(e) {
            return reject(e)
          }
        })      
      })
    }
  }
  
  Promise.prototype.catch = function(catchFunc) {
    return this.then(null, catchFunc)
  }
  
  Promise.resolve = function(value) {
    return new Promise((resolve, reject) => {
      resolve(value)
    })
  }
  
  Promise.reject = function(value) {
    return new Promise((resolve, reject) => {
      reject(value)
    })
  }
  
  Promise.race = function(promiseArray) {
    if (!Array.isArray(promiseArray)) {
        throw new TypeError('The arguments should be an array!')
    }
    return new Promise((resolve, reject) => {
      try {
        const length = promiseArray.length
        for (let i = 0; i <length; i++) {
          promiseArray[i].then(resolve, reject)
        }
      }
      catch(e) {
        reject(e)
      }
    })
  }
  
  Promise.all = function(promiseArray) {
    if (!Array.isArray(promiseArray)) {
        throw new TypeError('The arguments should be an array!')
    }
    return new Promise((resolve, reject) => {
      try {
        let resultArray = []
  
        const length = promiseArray.length
  
        for (let i = 0; i <length; i++) {
          promiseArray[i].then(data => {
            resultArray.push(data)
  
            if (resultArray.length === length) {
              resolve(resultArray)
            }
          }, reject)
        }
      }
      catch(e) {
        reject(e)
      }
    })
  }