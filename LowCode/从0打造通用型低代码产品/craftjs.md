* header  jsModule
* left  
    - 组件树  createReactMaterial(component,config,defaultProps)
    - 状态管理 zustand
    - 请求 本地开发  client -> NestJS ->  proxy  java 
* canvas
    - 
* right
    - 
* setter/fields

*  craftjs 撤退 前进  预览 
* zustand使用
* editor -> useEffect useSchema  -> useCreateStore() core/zustand
* 国际化




* framework
* @craftjs/core Editor
    - {...props}
    - resolver 
    - onRender
    - onNodesChange
    -  <I18nextProvider i18n={i18n}>{props.children}</I18nextProvider>
* left createReactMaterial(component,config,defaultProps)
* canvas 
    - IFrame  iframe -> react-frame-component
    - DocumentNodes
        - Frame @craftjs/core
        - Canvas @craftjs/core
* right
    - PROPS  mount-settings.tsx
    - EVENTS   
    - STYLE
    - useEditor    
        - state.events.selected
        -  const { data, related } = state.nodes[currentNodeId];
        -  SettingRender: related?.settingRender  panel
    - setter/fields  PROPS 表单
  ```
 // 样式
 actions.setProp(nodeId, (setterProps) => {
        setterProps.style = {
          ...setterProps?.style,
          ...changeValues
        }
})

// 事件
actions.setProp(nodeId, (setterProps) => {
        return merge(setterProps, {
          __events__: events
        })
})

// props

  const {
    id: nodeId,
    currentNodeProps,
    actions,
    SettingRender,
  } = useEditor((state) => {
    const [currentNodeId] = state.events.selected;

    if (currentNodeId) {
      const { data, related } = state.nodes[currentNodeId];

      return {
        id: currentNodeId,
        currentNodeProps: data.props,
        SettingRender: related?.settingRender,
      };
    }
  });



  const { run: handleFormChange } = useDebounceFn(async (changeValues: any) => {
    console.log(changeValues, 'changeValues')

    if (nodeId) {
      actions.setProp(nodeId, (setterProps) => {
        return merge(setterProps, changeValues)
      })
    }
    return true
  })


 ```        