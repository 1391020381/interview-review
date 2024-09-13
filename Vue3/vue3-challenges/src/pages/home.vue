
<script setup>
import { ref } from "vue"
const msg = ref("Hello World")
const obj = ref({a:{b:{c:1}}})
console.log('obj:',obj)
console.log(obj.value.a.b.c)
</script>

<template>
  <div>
    <!-- 页面的期望输出是Hello World -->
    <h1>msg</h1>
  </div>
</template>

