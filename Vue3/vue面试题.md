# [vue 的 keep-alive 的原理是啥？ ](https://github.com/pro-collection/interview-question/issues/119)



# [[vue] scope 是怎么做的样式隔离的](https://github.com/pro-collection/interview-question/issues/843)
* 生成唯一的作用域ID
* 添加作用域ID到模版元素
* 修改CSS选择器 


# [[Vue] 中为何不要把 v-if 和 v-for 同时用在同一个元素上， 原理是什么](https://github.com/pro-collection/interview-question/issues/579)
* 将v-if和v-for同时用在同一个元素上可能会导致性能问题。原因在于v-for具有比v-if更高的优先级，它会在每次渲染的时候都会运行。这意味着，即使在某些情况下v-if的条件为false，v-for仍然会对数据进行遍历和渲染。

# [[Vue] 异常处理机制有哪些](https://github.com/pro-collection/interview-question/issues/525)

* [超详细整理vue3基础知识](https://juejin.cn/post/7102217959669497887#heading-38)



* v-model
    - defineModel() 返回的值是一个 ref。 它可以像其他ref一样被访问以及修改,不过它能起到在父组件和当前变量之间的双向绑定的作用
    - 它的 .value 和父组件的 v-model的值同步
    - 当它被子组件变更了,会触发父组件绑定的值一起更新。
    - 这意味着你也可以用 v-model 把这个 ref绑定到一个原生 input元素上,在提供相同的 v-model 用法的同时轻松包装原生 input元素。
    - defineModel 是 一个便利宏。 编译器将其展开为以下内容:
        - modelValue 的 prop 本地 ref的值与其同步
        - update:modelValue的事件 当本地 ref的值发生变更时触发。
```
<!-- Child.vue -->
<script setup>
const model = defineModel()

function update() {
  model.value++
}
</script>

<template>
  <div>Parent bound v-model is: {{ model }}</div>
  <button @click="update">Increment</button>
</template>


<!-- Parent.vue -->
<Child v-model="countModel" />



<!-- Child.vue -->
<script setup>
const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <input
    :value="modelValue"
    @input="emit('update:modelValue', $event.target.value)"
  />
</template>


<!-- Parent.vue -->
<Child
  :modelValue="foo"
  @update:modelValue="$event => (foo = $event)"
/>

```

* 递归组件
    - 一个单文件组件可以通过它的文件名被其他自己引用。 例如 名为 FooBar.vue 的组件可以在其模版中用 <FooBar/> 引用它自己。
    - 请注意这种方式相比于导入的组件优先级更低。如果有具名的导入和组件自身推导的名字冲突了，可以为导入的组件添加别名：
    - import { FooBar as FooBarChild } from './components'如果有具名的导入和组件

* vuedomdiff 时间复杂度
  - https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/151