
```

import { createApp, h } from 'vue'
import MyComponent from './MyComponent.vue'

function createComponent(Component, props) {
  // 创建一个新的Vue应用
  const appInstance = createApp({
    render() {
      // 使用h函数创建VNode
      return h(Component, props)
    }
  })

  // 创建一个实例挂载目标的元素
  const mountNode = document.createElement('div')

  // 挂载到新创建的元素上
  appInstance.mount(mountNode)

  return appInstance
}

// 使用方法
createComponent(MyComponent, { prop: 'value' })


```