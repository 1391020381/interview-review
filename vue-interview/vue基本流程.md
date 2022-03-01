
1. initMixin(Vue)
     - Vue.prototype._init
     - Vue.prototype.$mount
2. renderMixin(Vue) 
      - Vue.prototype._c
      - Vue.prototype._v
      - Vue.prototype._s
      - Vue.prototype._render
      - Vue.prototype.$nextTick
3. lifecycleMixin(Vue)
      - Vue.prototype._update 
4.  stateMixin(Vue)
     - Vue.prototype.$watch
5.  initGlobalApi(Vue)
    - Vue.options
    - initMixin(Vue)      Vue.mixin
    -  Vue.options.component
    -  Vue.options.directive
    -  Vue.options.filter
    - Vue.options._base = Vue
    - initExtend(Vue) Vue.extend
    - initAssetRegisters(Vue)   Vue.component  Vue.directive Vue.filter


*  initMixin(Vue) 

const vm = this;
// 这里的this代表调用_init方法的对象(实例对象)
//  this.$options就是用户new Vue的时候传入的属性和全局的Vue.options合并之后的结果
vm.$options = mergeOptions(vm.constructor.options, options);  

* 组件 指令 过滤器的合并策略
* //比如有同名的全局组件和自己定义的局部组件 那么parentVal代表全局组件 自己定义的组件是childVal  首先会查找自已局部组件有就用自己的  没有就从原型继承全局组件  res.__proto__===parentVal

* //生命周期合并策略
* 父子都有 ['父','子'] 



* Watcher  Dep
* Object.defineProperty 时 为每一个属性都 都创建了Dep

* mountComponent  中会创建 new Watcher
* new Watcher() 会自执行 get 
* get 会先把 pushTarget(this)  把 当前属性的watcher 存放到 targetStack 并 Dep.target = watcher
* 然后执行 get 会触发  Object.defineProperty 中的 当前key的get
* Dep.target 有值    dep.depend()  Dep.target有值 Dep.target.addDep(this) 
* watcher addDep(dep) 在当前元素的watcher 保存 dep的
* dep.addSub(this) 然后又把当前watcher 保存到 该属性 dep的 subs





* 响应式的过程中,会给每个属性 生成一个Dep.
* mountComponent   new Watcher
* new Watcher 会自动执行 get  
* get 会触发 Dep.pushTarget 把 watcher保存到   targetStack   Dep.target = watcher
* get 执行 updateComponent 会触发  Object.defineProperty.  Dep.target 有值  执行 dep.depend()
* dep.denpend()  Dep.target有值  执行 Dep.target.addDep    watcher addDep 保存 dep 并执行 dep.addSub() 把 当前的watcher保存在当前属性的 dep subs中

* 后面改变响应式对象的值 会触发  Object.defineProperty  的 set  会 触发 当前 属性的 dep.notify()
* dep.notify()  循环执行 该属性的subs的 watcher 并执行 watche.update()
* watche.update    执行 queueWatcher