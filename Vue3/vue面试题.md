# [vue 的 keep-alive 的原理是啥？ ](https://github.com/pro-collection/interview-question/issues/119)



# [[vue] scope 是怎么做的样式隔离的](https://github.com/pro-collection/interview-question/issues/843)
* 生成唯一的作用域ID
* 添加作用域ID到模版元素
* 修改CSS选择器 


# [[Vue] 中为何不要把 v-if 和 v-for 同时用在同一个元素上， 原理是什么](https://github.com/pro-collection/interview-question/issues/579)
* 将v-if和v-for同时用在同一个元素上可能会导致性能问题。原因在于v-for具有比v-if更高的优先级，它会在每次渲染的时候都会运行。这意味着，即使在某些情况下v-if的条件为false，v-for仍然会对数据进行遍历和渲染。

# [[Vue] 异常处理机制有哪些](https://github.com/pro-collection/interview-question/issues/525)

* [超详细整理vue3基础知识](https://juejin.cn/post/7102217959669497887#heading-38)