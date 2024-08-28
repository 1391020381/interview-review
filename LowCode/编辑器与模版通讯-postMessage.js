

// iframe 加载的时候,向 编辑器端 传递 模版信息
export function postMsgToParent (message) {
    window.parent.postMessage(
      message,
      '*'
    );
  }
  
  // 通知父容器
  postMsgToParent({
    type: 'returnConfig',
    data: {
      components: this.componentConfig, // 当前模板信息
      // ...
    }
  });
  