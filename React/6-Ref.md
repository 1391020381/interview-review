* Ref的创建   React.createRef()   React.useRef()
* React 对 ref的处理。  React 对 Ref 处理，主要指的是对于标签中 ref 属性，React 是如何处理以及 React 转发 Ref。

* useRef 底层逻辑是和 createRef 差不多，就是 ref 保存位置不相同，类组件有一个实例 instance 能够维护像 ref 这种信息。
* 由于函数组件每次更新都是一次新的开始，所有变量重新声明，所以 useRef 不能像 createRef 把 ref 对象直接暴露出去，如果这样每一次函数组件执行就会重新声明 Ref，此时 ref 就会随着函数组件执行被重置，这就解释了在函数组件中为什么不能用 createRef 的原因。
* 为了解决这个问题，hooks 和函数组件对应的 fiber 对象建立起关联，将 useRef 产生的 ref 对象挂到函数组件对应的 fiber 上，函数组件每次执行，只要组件不被销毁，函数组件对应的 fiber 对象一直存在，所以 ref 等信息就会被保存下来


* 类组件 
    - this.refs
    - ref是函数
    - 属性是 Ref对象

```

// 字符串
/* 类组件 */
class Children extends Component{  
    render=()=><div>hello,world</div>
}
/* TODO:  Ref属性是一个字符串 */
export default class Index extends React.Component{
    componentDidMount(){
       console.log(this.refs)
    }
    render=()=> <div>
        <div ref="currentDom"  >字符串模式获取元素或组件</div>
        <Children ref="currentComInstance"  />
    </div>
}

class Children extends React.Component{  
    render=()=><div>hello,world</div>
}
/* TODO: Ref属性是一个函数 */
export default class Index extends React.Component{
    currentDom = null
    currentComponentInstance = null
    componentDidMount(){
        console.log(this.currentDom)
        console.log(this.currentComponentInstance)
    }
    render=()=> <div>
        <div ref={(node)=> this.currentDom = node }  >Ref模式获取元素或组件</div>
        <Children ref={(node) => this.currentComponentInstance = node  }  />
    </div>
}


```


1. forwardRef 转发 Ref
* forwardRef 的初衷就是解决 ref 不能跨层级捕获和传递的问题。 forwardRef 接受了父级元素标记的 ref 信息，并把它转发下去，使得子组件可以通过 props 来接受到上一层级或者是更上层级的ref
* 使上级组件可以通过 ref 获取 下级组件的ref


* 函数组件缓存数据  ref fiber



* ![Ref的处理逻辑原理](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/08a2393077634beaad2b91f971ab381f~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp)