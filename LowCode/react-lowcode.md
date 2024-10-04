* amis

* 整个低代码编辑器就是围绕这个json来的。
* 从物料拖拽组件到画布区,其实就是在json的某一层加了一个组件对象。
* 选中组件在右侧编辑属性,其实就是修改json里某个组件对象的属性。
* 大纲就是把这个json用树行进行展示。

* react-dnd
* allotment 实现可拖动改变大小的 pane

* zustand  jsontree curd   updateComponentProps(componentId,{})
* zustand  component-config


```
const { components, addComponent } = useComponetsStore();
const { componentConfig } = useComponentConfigStore();

 function renderComponents(components: Component[]): React.ReactNode {
        return components.map((component: Component) => {
            const config = componentConfig?.[component.name]

            if (!config?.component) {
                return null;
            }
            
            return React.createElement(
                config.component,
                {
                    key: component.id,
                    ...config.defaultProps,
                    ...component.props,
                },
                renderComponents(component.children || [])
            )
        })
}

```

* react-dnd react-dnd-html5-backend
* 在要拖拽的组件上添加 useDrag，在拖拽到的组件上添加 useDrop 就可以实现拖拽。
* type 是当前 drag 的元素的标识，drop 的时候根据这个来决定是否 accept。item 是传递的数据。
* accept 指定接收的 type，这里接收 Button 和 Container 组件 drop 的时候显示下传过来的 item 数据。canDrop 的话加一个 border 的高亮。

```
  <DndProvider backend={HTML5Backend}>
        <App />
    </DndProvider>


// 物料渲染

import { useEffect, useRef } from "react";
import { useDrag } from "react-dnd";

export interface MaterialItemProps {
    name: string
}

export function MaterialItem(props: MaterialItemProps) {

    const {
        name
    } = props;

    const [_, drag] = useDrag({
        type: name,
        item: {
            type: name
        }
    });

    return <div
        ref={drag}
        className='
            border-dashed
            border-[1px]
            border-[#000]
            py-[8px] px-[10px] 
            m-[10px]
            cursor-move
            inline-block
            bg-white
            hover:bg-[#ccc]
        '
    >
        {name}
    </div>
}

// drop

import { message } from "antd";
import { PropsWithChildren } from "react";
import { useDrop } from "react-dnd";

function Page({ children }: PropsWithChildren) {

    const [{ canDrop }, drop] = useDrop(() => ({
        accept: ['Button', 'Container'],
        drop: (item: { type: string}) => {
            message.success(item.type)
        },
        collect: (monitor) => ({
          canDrop: monitor.canDrop(),
        }),
    }));

    return (
        <div
            ref={drop}
            className='p-[20px] h-[100%] box-border'
            style={{ border: canDrop ? '2px solid blue' : 'none' }}
        >
            {children}
        </div>
    )
}

export default Page;


```

* hover 画布hover展示高亮框
    - 实现了下编辑的时候的交互，实现了 hover 的时候展示高亮框和组件名。
    - 我们在每个组件渲染的时候加上了 data-component-id，然后在画布区根组件监听 mouseover 事件，通过触发事件的元素一层层往上找，找到 component-id。
    - 然后 getBoudingClientRect 拿到这个元素的 width、height、left、top 等信息，和画布区根元素的位置做计算，算出高亮框的位置。
    - 并在高亮框的右上角展示了组件名。这样，编辑时高亮展示组件信息的功能就完成了。
    - e.nativeEvent.composedPath();
        - 在React中，e.nativeEvent.composedPath()方法的作用是返回一个事件的路径（path），这个路径是从最具体的事件目标（event target）到最不具体的事件目标（通常是document或window）的有序事件目标集合
    - position  createPortal(element,el)

* component-json
* component-config-json   setter   renderFormElememt

* 预览 大纲

* 事件绑定
    - 先实现内置动作的方式   renderProps 特殊处理 预览或编译时
    - 在 componentConfig 里配置组件可以绑定的事件，然后在Setting区事件面板里展示
    - 可以选择绑定的动作   link  toast  
    - 然后渲染Preview的时候根据这些信息来绑定事件
    
    - 这节我们实现了组件联动，也就是一个组件可以调用另一个组件的方法。
    - 原理就是组件通过 forwardRef + useImperativeHandle 暴露一些方法，然后在 action 里配置 componentId、method。
    - 这样预览的时候收集所有组件的 ref，事件触发的时候根据配置调用对应 componentId 的对应 method。
    - 这样，我们支持了内置动作、自定义 JS、组件联动，事件绑定的功能就比较完整了。


    -  递归渲染组件 renderComponents 的时候，把组件ref收集起来，放到一个map里
    - id为 111的组件想调用 id 为 222的组件方法 ccc方法 就只需要在动作里添加配置
    - 然后处理事件的时候，根据这个 componentId 和 method 从 refs 里拿到对应的方法执行就好了。
    - 这样就实现了组件联动。

```
    // key 为组件 id

    {
    1111: {
        aaa() {
        }
        bbb() {
        }
    },
    222: {
        ccc() {
        }
        ddd() {
        }
    }
}

actions: [
    {
        type: 'componentMethod',
        config: {
            componentId: 222,
            method: 'ccc'
        }
    }
]

```


1. 基于 react-dnd 实现了拖拽，可以拖拽物料到组件树的任意层级
2. 通过 zustand 实现了全局 store 的存储，比如组件树、组件配置等，并用 persist 中间件做了持久化
3. 通过 tailwind 来写样式，不需要写 css 文件
4. 通过 getBoudingClientRect 拿到 hover、click 的组件边界，动态计算编辑框位置
5. 通过 json 递归渲染组件，基于 React.cloneElement 来修改组件 props
6. 通过 ref 实现了组件联动，组件通过 forwardRef + useImperativeHandle 暴露方法，然后全局注册，供别的组件调用