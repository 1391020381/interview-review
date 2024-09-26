
<template>
  <button @click="handleClick" class="btn">{{ label }}</button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Button',
  props: {
    label: {
      type: String,
      required: true
    }
  },
  setup(props, { emit }) {
    const handleClick = () => {
      console.log('Button')
      emit('ButtonClick')
    }

    return {
      label: props.label,
      handleClick
    }
  }
})
</script>
<style lang="less" >
.btn{
  color: red;
}
</style>