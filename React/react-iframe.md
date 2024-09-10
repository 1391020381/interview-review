# react iframe
* iframe react 原生
* react-frame-component


* iframe在浏览器中是一个非常好的沙盒容器，能够在网页中嵌入另一个网页或文档。常常被作为微前端容器的隔离方案存在。
* 在低代码平台当中，我们也需要借用iframe的能力来为编辑器画布提供对应的隔离能力,以此来兼容部分特殊单位在画布中的显示，如 vw  vh等长度的单位的兼容，尤其是在移动端上被广泛应用。 设置 iframe 的 宽 高。  也可动态调整
* createPortal(children, mountNode) 

```

import * as React from 'react'
import { css } from '@emotion/css'
import { createPortal } from 'react-dom'

export interface FrameRenderProps {
  children?: React.ReactNode
}

export const FrameRender: React.FC<FrameRenderProps> = ({ children, ...props }) => {

  const ref = React.useRef<HTMLIFrameElement>(null)

  const mountNode =
    ref?.current?.contentWindow?.document.body

  return (
    <iframe {...props} ref={ref} width="100%" height="100%" className={css({
      border: 'none'
    })} >
      {mountNode ? createPortal(children, mountNode) : null}
    </iframe>
  )
}


```
* 通过为 iframe绑定 ref 从而获取iframe实体的body,这个body就是createPortal需要挂载的节点，调用 createPortal(children,mountNode)方法， 此时就会将FrameRender组件的childrenr渲染到 iframe当中去,也就无需新创建一个 route来专门的作为显示容器，纯粹当成沙盒容器来使用。