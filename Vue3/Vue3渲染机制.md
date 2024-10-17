* [渲染机制](https://cn.vuejs.org/guide/extras/rendering-mechanism.html)

* 虚拟dom
    - 将目标所需的UI通过数据结构 ‘虚拟’地表示出来,保存在内存中,然后将真实的dom与值保持同步。

* 一个运行时渲染器将会遍历整个虚拟dom树,并据此构建真实的dom树。 这个过程被称为挂载(mount)

* 如果我们有两份虚拟dom树,渲染器将会有比较地遍历它们,找出它们之间的区别,并应用这个其中的变化到真实的dom上。  这个过程被称为 更新 patch 。  也被称为 比对 diffing  协调 reconciliation

* 编译   template ->  renderfunc   构建步骤提前完成
* 挂载   运行时渲染器调用渲染函数,遍历返回的虚拟dom树    响应式副作用
* 更新   依赖更新 副作用更新运行

* ![渲染机制](https://cn.vuejs.org/assets/render-pipeline.CwxnH_lZ.png)



* Proxy   WeakMap target key    key Map   Set
* effect  activeEffect  effectStack
* track
* trigger
* scheduler
* jobQueue  flushJob   jobQueue.add

* 渲染器 
    - const renderer = createRenderer({fn})
    - renderer.render(vnode,document.querySelector('#app'))