1. MVVM 理解
2. Vue2 Vue3响应式数据的理解+
* 数组和对象类型当值变化时如何劫持到。对象内部通过defineReactive方法,使用Object.defineProperty将属性进行劫持(只会劫持已经存在的属性),数组则是通过重写数组方法来实现。多层对象是通过递归来实现劫持。
* Vue3则采用proxy
3. Vue中如何检测数组变化

* 由于数组属于引用类型,所以其本质上还是属于对象的。
* 深层次对象 监控不到。
* 对象和数组作为引用类型之所以无法被检测到是因为我们存储在栈区的只是一个指向堆区的指针,数据的改变不会引起指向其指针的变化。所以无法被 Object.defineProperty
* 对象和属性变化时分几种情况,当新增数据时由于属性名(索引)增加而无法被Object.defineProperty检测到所以无法通过Object.defineProperty检测数组变化 

* Object.defineProperty 无法检测到数组长度的变化。准确的说是无法检测到通过改变length而增加的长度。



* 对于Object.defineProperty来说 处理对象和数组一样只是在初始化时去改写 get和 set达到检测数组或对象的变化。 对于新增的属性,需要手动再初始化。
* [为什么Object.defineProperty不能检测到数组长度的变化](https://burning-shadow.github.io/2019/04/25/%E4%B8%BA%E4%BB%80%E4%B9%88Object.defineProperty%E4%B8%8D%E8%83%BD%E6%A3%80%E6%B5%8B%E5%88%B0%E6%95%B0%E7%BB%84%E9%95%BF%E5%BA%A6%E7%9A%84%E5%8F%98%E5%8C%96/)

4. Vue中如何进行依赖收集
* 每个属性都拥有自己的dep属性,存放他所依赖的watcher,当属性变化后会通知自己对应的watcher去更新
* 默认在初始化时会调用render函数,此时会触发属性依赖收集 dep.depend
* 当属性发生修改时会触发 watcher更新 dep.notify()

5. 如何理解Vue中模板编译原理
* 问题核心:如何将template转换成render函数
    - template -> ast
    - 静态语法做静态标记 markup   
    - ast -> code
6. Vue的生命周期方法有哪些？一般在哪一步发送请求及原因

7. Vue.mixin的使用场景和原理
8. Vue组件data为什么必须是个函数
* 每次使用组件时都会对组件进行实例化操作,并且调用data函数返回一个对象作为组件的数据源 这样可以保证多个组件间数据互不影响。
9. computed 和watch 区别
* computed 和watch都是基于Watch实现的
* computed 属性是具备缓存的,依赖的值不发生变化,对其取值时计算属性方法不会重新执行
* watch则是监控值的变化当值发生变化时调用对应的回调函数。

10. Vue通过数据劫持可以精确探测数据变化,为啥还需要 虚拟DOM进行diff检测差异
* 响应式数据变化，Vue确实可以在数据发生变化时,响应式系统可以立刻得知。但是如果给每个属性都添加watcher用于更新的话，会产生大量的watcher从而降低性能。

* 而且粒度过细也会导致更新不精准的问题，`所以vue采用了组件级的watcher配合diff来检测差异`。