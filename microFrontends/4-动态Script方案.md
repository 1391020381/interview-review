
# 主应用
1. 主应用获取配置信息,根据配置信息创建  子应用导航,监听导航 创建 script标签加载 对应 子应用资源, 其中涉及到  css 删除？ 避免 相互污染   js 删除重新加载 可能会有问题,例如 let不能重复声明。
2. 子应用 静态 js css 文件

```
const obj = [
    {
      name: "micro1",
      id: "micro1",
      // 这里暂时以一个入口文件为示例
      script: `http://${host}:${port.micro}/micro1.js`,
      style: `http://${host}:${port.micro}/micro1.css`,
      // 挂载到 window 上的启动函数 window.micro1_mount
      mount: "micro1_mount",
      // 挂载到 window 上的启动函数 window.micro1_unmount
      unmount: "micro1_unmount",
      prefetch: true,
    },
    {
      name: "micro2",
      id: "micro2",
      script: `http://${host}:${port.micro}/micro2.js`,
      style: `http://${host}:${port.micro}/micro2.css`,
      mount: "micro2_mount",
      unmount: "micro2_unmount",
      prefetch: true,
    },
  ]

```