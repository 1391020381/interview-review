* [React进阶实践指南-React-redux](https://juejin.cn/book/6945998773818490884/section/6959910194696421406)



```
import { Provider, connect } from 'react-redux'

import { createStore, applyMiddleware, combineReducers } from 'redux'


/* number Reducer */
function numberReducer(state = 1, action) {
  switch (action.type) {
    case 'ADD':
      return state + 1
    case 'DEL':
      return state - 1
    default:
      return state
  }
}
/* 用户信息reducer */
function InfoReducer(state = {}, action) {
  const { payload = {} } = action
  console.log('InfoReducer:',{
    ...state,
    ...payload // 被赋值到 state.info 上
  })
  switch (action.type) {
    case 'SET':
      return {
        ...state,
        ...payload // 被赋值到 state.info 上
      }
    default:
      return state
  }
}

/* 打印中间件 */
/* 第一层在componse中被执行 */
function logMiddleware() {
  /* 第二层在reduce中被执行 */
  return (next) => {
    /* 返回增强后的dispatch */
    return (action) => {
      const { type } = action
      console.log('发生一次action:', type)
      return next(action)
    }
  }
}
/* 注册中间件  */
const rootMiddleware = applyMiddleware(logMiddleware)
/* 注册reducer */
const rootReducer = combineReducers({ number: numberReducer, info: InfoReducer })
/* 合成Store */
const Store = createStore(rootReducer, { number: 1, info: { name: null } }, rootMiddleware)


// redux
// Store.getState()
// Store.subscribe(()=>{})

function IndexRedux(){
  const [ state , changeState  ] = useState(Store.getState())
  useEffect(()=>{
    /* 订阅state */
    const unSubscribe = Store.subscribe(()=>{
        console.log('Store.getState():',Store.getState())
         changeState(Store.getState())
     })
    /* 解除订阅 */
     return () => unSubscribe()
  },[])
  return <div >
          <p>  {state.info.name ? `hello, my name is ${ state.info.name}` : 'what is your name'} ,
           {state.info.mes ? state.info.mes  : ' what do you say? '} </p>
         《React进阶实践指南》 {state.number} 👍 <br/>
        <button onClick={()=>{ Store.dispatch({ type:'ADD' })  }} >点赞</button>
        <button onClick={()=>{ Store.dispatch({ type:'SET',payload:{ name:'alien' , mes:'let us learn React!'  } }) }} >修改标题</button>
     </div>
}


// React-Redux

// Provider
// connection(CompAMapStateToProps,CompAmapDispatchToProps)




/* A组件 */
function ComponentA({ toCompB, compBsay }) {
  const [CompAsay, setCompAsay] = useState('')
  return <div className="box" >
    <p>我是组件A</p>
    <div> B组件对我说：{compBsay} </div>
        我对B组件说：<input onChange={(e) => setCompAsay(e.target.value)}
            placeholder="CompAsay"
               />
    <button onClick={() => toCompB(CompAsay)} >确定</button>
  </div>
}
/* 映射state中CompBsay  */
const CompAMapStateToProps = state => ({compBsay:state.info.compBsay})
/* 映射toCompB方法到props中 */
const CompAmapDispatchToProps = dispatch => ({ toCompB: (mes) => dispatch({ type: 'SET', payload: { compAsay: mes } }) })
/* connect包装组件A */
export const CompA = connect(CompAMapStateToProps, CompAmapDispatchToProps)((ComponentA))

/* B组件 */
class ComponentB extends React.Component {
  state={ compBsay:'' }
  handleToA=()=>{
    // this.props.compAsay.compBsay = 111111
    this.props.dispatch({ type: 'SET', payload: { compBsay:this.state.compBsay } })
  }
  render() {
    return <div className="box" >
      <p>我是组件B</p>
      <div> A组件对我说：{this.props.compAsay.compAsay} </div>
       我对A组件说：<input onChange={(e)=> this.setState({ compBsay: e.target.value  })}
           placeholder="CompBsay"
              />
      <button  onClick={this.handleToA} >确定</button>
    </div>
  }
}
/* 映射state中 CompAsay  */
const CompBMapStateToProps = state => ({ compAsay: state.info })
export const CompB =  connect(CompBMapStateToProps)(ComponentB)

/* 共享数据       */
function Index() {
  return <div>
    <CompA />
    <CompB />
  </div>
}

export default function Root() {
  return <Provider store={Store} >
    <IndexRedux/>
    <Index />
  </Provider>
}

```



* Provider 
* 由于redux数据层 可能被很多组件消费，所以 react-redux中提供了一个 Provider组件，可以全局注入 redux中的 store   所以使用者需要把Provider注册到根部组件中。
* Provider 作用就是保存redux中的 store，分配给需要的state的子孙组件


* connect 
* 既然已经全局注入 Store 那么需要Store中状态或者想要改变Store的状态，那么如何处理呢,React-Redux 提供了一个高阶组件 connect 被 connect包装后的组件将获得如下功能：
    - 能够从props中获取改变 state的方法 Store  dispatch
    - 如果connect有第一个参数 那么会将 redux state 中的数据，映射到当前组件的props中，子组件可以使用消费。
    - 当需要的state 有变化的时候，会通知当前组件更新，重新渲染视图。
    - 数据获取 数据通信 状态派发
    - function connect(mapStateToProps?,mapDispatchToProps?,mergeProps?,options?)

```
const mapStateToProps = state => ({number:state.number})

// 组件依赖redux的state，映射到业务组件的props中，state改变触发，业务组件props改变，触发业务组件更新视图。 当这个参数没有的时候，当前组件不会订阅store的改变。


// mapDispatchToProps
const mapDispatchToProps =  dispatch =>{
    return {
        numberAdd: ()=> dispatch({type:'ADD'}),
        setInfo:()=> dispatch({type:'SET'})
    }
}

const CompAmapDispatchToProps = dispatch => ({ toCompB: (mes) => dispatch({ type: 'SET', payload: { compAsay: mes } }) })
```