# 手写 Mini React思路



* 通过记录 parent、slibling 信息，让树变成链表，可以打断。每次处理一个 fiber 节点，处理每个 fiber 节点前判断是否到了固定的时间间隔，也就是时间分片，通过时间分片把处理 fiber 的过程放到多个任务里跑，这样页面内容多了也不会导致卡顿。

* 这个时间片的判断就是通过当前时间和任务开始时间点的差值。


* ![React渲染流程](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4b061ec85d9641799a8469d68738aa13~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1304&h=740&s=251224&e=png&b=fefdfd)

* 整体分为两大阶段
* render阶段： 把 React Element树 vdom 转成fiber链表的 reconcile过程,由 Scheduler负责调度,通过时间分片来把计算分到多个任务里去。
* commit 阶段 reconcile结束就有了完整的fiber链表,再次遍历这个fiber 链表,执行其中的 effect 增删改 dom等。
* 其实 commit 阶段也分为三个阶段
    - before mutation 操作 dom之前
    - mutation 操作dom
    - layout 操作dom之后

* useEffect的 effect函数会在 before mutation 前异步调度执行 而 useLayoutEffect的 effect函数是在 layout阶段同步执行。

* ref 在 mutation 阶段更新了dom,所以在layout阶段就可以拿到ref了。