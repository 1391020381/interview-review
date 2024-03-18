
<template>
  <button @click="handleClick">{{ label }}</button>
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
      emit('click')
    }

    return {
      label: props.label,
      handleClick
    }
  }
})
</script>