* React是有多种模式的，基本平时用的都是 legacy 模式下的 React。
* 除了legacy 模式，还有 blocking 模式和 concurrent 模式， blocking 可以视为 concurrent 的优雅降级版本和过渡版本。
* React 最终目的，不久的未来将以 concurrent 模式作为默认版本，这个模式下会开启一些新功能。
* 对于 concurrent 模式下，会采用不同 State 更新逻辑。前不久透露出未来的Reactv18 版本，concurrent 将作为一个稳定的功能出现。

* 本章节主要还是围绕 legacy 模式下的 state 。通过本文学习，目的是让大家了解 React 更新流程，以及类组件 setState 和函数组件 useState 的诸多细节问题。


1. setState用法详解，底层更新流程。
2. useState用法详解，注意事项。
3. 几种不同优先级的更新任务。

```
export default class index extends React.Component{
    state = { number:0 }
    handleClick= () => {
          this.setState({ number:this.state.number + 1 },()=>{   console.log( 'callback1', this.state.number)  })
          console.log(this.state.number)
          this.setState({ number:this.state.number + 1 },()=>{   console.log( 'callback2', this.state.number)  })
          console.log(this.state.number)
          this.setState({ number:this.state.number + 1 },()=>{   console.log( 'callback3', this.state.number)  })
          console.log(this.state.number)
    }
    render(){
        return <div>
            { this.state.number }
            <button onClick={ this.handleClick }  >number++</button>
        </div>
    }
} 


```
* isBatchingEventUpdates
* ![setState正常执行合并](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/478aef991b4146c898095b83fe3dc0e7~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp)

* unstable_batchedUpdates 最新被移除

* ![setState-settimeout](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/48e730fc687c4ce087e5c0eab2832273~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp)


* flushSync

```

handerClick=()=>{
    setTimeout(()=>{
        this.setState({ number: 1  })
    })
    this.setState({ number: 2  })
    ReactDOM.flushSync(()=>{
        this.setState({ number: 3  })
    })
    this.setState({ number: 4  })
}
render(){
   console.log(this.state.number)
   return ...
}


```
* 首先 flushSync this.setState({ number: 3 })设定了一个高优先级的更新，所以 2 和 3 被批量更新到 3 ，所以 3 先被打印。
* 更新为 4。
* 最后更新 setTimeout 中的 number = 1。

* flushSync补充说明：flushSync 在同步条件下，会合并之前的 setState | useState，可以理解成，如果发现了 flushSync ，就会先执行更新，如果之前有未更新的 setState ｜ useState ，就会一起合并了，所以就解释了如上，2 和 3 被批量更新到 3 ，所以 3 先被打印。

* flushSync 中的 setState > 正常执行上下文中 setState > setTimeout ，Promise 中的 setState。



```

const [ number , setNumber ] = React.useState(0)
const handleClick = ()=>{
    ReactDOM.flushSync(()=>{
        setNumber(2) 
        console.log(number) 
    })
    setNumber(1) 
    console.log(number)
    setTimeout(()=>{
        setNumber(3) 
        console.log(number)
    })   
}

```

* 原因很简单，函数组件更新就是函数的执行，在函数一次执行过程中，函数内部所有变量重新声明，所以改变的 state ，只有在下一次函数组件执行时才会被更新。所以在如上同一个函数执行上下文中，number 一直为0，无论怎么打印，都拿不到最新的 state 。
* 在 useState 的 dispatchAction 处理逻辑中，会浅比较两次 state ，发现 state 相同，不会开启更新调度任务； demo 中两次 state 指向了相同的内存空间，所以默认为 state 相等，就不会发生视图更新了。
* 解决问题： 把上述的 dispatchState 改成 dispatchState({...state}) 根本解决了问题，浅拷贝了对象，重新申请了一个内存空间。


* 通常可以把 state作为依赖项传入 useEffect第二个参数 deps,但是注意 `useEffect初始化会默认执行一次`。