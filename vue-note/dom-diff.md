* vm.render()
* Vue.prototype._render    
* ast -> vnode  如果是变量会到 vm上获取值。
* vnode 使用一个对象描述dom，ast-> vnode的时候，它就有值啦。

* 当页面包含多个组件时
* template =  `<div> <p>justdoit</p> <my-component1> <my-component2></my-component2>  </my-component1></div>`
* template -> ast(描述 template树形结构 标签的类型 属性) -> code (带有创建 虚拟dom的函数)
* patch(vnode)生成dom  new Watcher(vm,()=>{},{watcher:true})
* 当数据更新的时候,会生成新的vnode   vnode prevnode

* 生命周期调用时机
  - beforeCreate  initState(vm)  created  -> vm.$mount(el)
  - vm.$mount(el)  beforeMount  new Watcher(vm,updateComponent)   mounted

* Vue父子组件 生命周期顺序

* 组件的调用顺序都是先父后子,渲染完成的顺序肯定是先子后父
* 组件的销毁操作是 先父后子,销毁完成的顺序是先子后父

* watcher(watcher一个实例上存在的数据,流程类似 正常的流程)  computed （生成一个数据, new Watcher(vm，getter,()=>{},{lazy:true}） 不会自动收集收集依赖(执行this.get())
* defineComputed(vm,key,userDef) 也就是在 vm实例上添加啦一个 key(也就是computed) 当你获取数据的时候，会拿vm._computedWatchers 上watcher. 触发 watcher.evaluate() -> this.get() 又走到正常流程

* computer 计算 依赖 其他响应式对象。当它们改变会触发 computer的update.
* dom diff