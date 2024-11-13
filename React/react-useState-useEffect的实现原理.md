* [搞懂 useState 和 useEffect 的实现原理](https://juejin.cn/post/7203336895887114300)

* jsx 会被编译成 render function 也就是类似 React.createElement

```
const content = <div>guang</div>


"use strict";
var content = 
/*#__PURE__*/ React.createElement("div",null,"guang"); 

// 所以之前写 React组件都必须有一行 import * as React from 'react', 因为编译后会用到React的api。


”use strict“;
var _jsxRuntime = require("react/jsx-runtime");
var content = /*#__PURE__*/(0,_jsxRuntime.jsx("div",{children:"guang"}))

```
* vdom 会转换为fiber结构,它是一个链表。
* vdom转 fiber的流程叫做 reconcile, 我们常说的diff算法就是在 reconcile  这个过程中。

* 多个节点的 diff也就是当老的 fiber子节点列表需要更新的时候,要和新的vdom的children进行对比, 找到哪些是可以复用的,直接移动过去,剩下的节点做增删,产生新的fiber节点列表。

* react渲染流程整体分为两个阶段: render 阶段 和 commit阶段。
* render阶段也就是 reconcile的vdom转 fiber的过程
* commit阶段就是具体操作dom,以及执行副作用函数的阶段。
* commit 阶段还分为 before mutation  mutation layout。
* 具体操作dom的阶段是 mutation 
* layout 阶段在操作dom之后，所以这个阶段是能拿到dom的, ref更新是在这个阶段, useLayoutEfect回调函数的执行也是在这个阶段。

* hook 的数据是存放在 fiber的 memoizedState属性的链表上的,每个hook对应的一个节点,第一次执行 useXxx的 hook会走 mountXxx的逻辑创建hook链表,之后会走 updateXxx的逻辑。


* useEffect的hook在render阶段会把 effect放到 fiber的 updateQueue中,这是一个 lastEffect.next串联的环形链表,然后commmit阶段会把异步执行所有fiber节点的updateQueue中的effect.

* useState同样分为 mountState updateState两个阶段
* mountState 会返回 state 和 dispatch, dispatch函数里会记录更新到hook.queue 然后标记当前 fiber到根 fiber的lane需要更新,之后调度下次渲染。
* 再次渲染的时候会执行 updateState 会 取出 hook.queue 根据优先级确定最终的 state返回,这样渲染出的就是最新的结果。