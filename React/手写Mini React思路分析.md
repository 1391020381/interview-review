* [手写Mini React思路分析](https://juejin.cn/book/7294082310658326565/section/7304894187895193626)

* React的渲染流程,整体分为两大阶段
    - render阶段  把 React Element树(也叫vdom) 转成 fiber链表的 reconcile过程,由Scheduler负责调度,通过时间分片来把计算分到多个任务里去。
    - commit阶段  reconcile结束就有了完整的 fiber链表,再次遍历这个 fiber链表,执行其中的 effect 增删改茶dom等。
* 其实commit 阶段也分成三个小阶段:
    - before mutation 操作 dom之前
    - mutation 操作dom之后。
* useEffect的 effect函数会在 before mutation前异步调度执行,而 useLayoutEffect的effect函数是在 layout阶段同步执行。
* ref 在 mutation 阶段更新了dom,所以在layout阶段就可以拿到ref。



* 事件机制
* 调度与时间分片
* 调度与fiber
* hooks原理