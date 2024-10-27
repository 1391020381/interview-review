# 进程模型
- 主进程 
    - 每个Electron应用都有一个单一的主进程,作为应用程序的入口点。主进程在Nodejs环境中运行,这意味它具有require模块和使用所有Nodejs API的能力。
- 窗口管理

# 上下文隔离
    - 上下文隔离功能将确保  预加载脚本 和 Electron的内部逻辑 运行在所加载的 webcontent网页之外的另外一个独立的上下环境里。
    - 有助于阻止网站访问 Electron的内部组件 和 预加载脚本可访问 高等级权限的API。
    - 单单开启和使用 contextIsolation 并不直接意味着您所做的一切都是安全的

```
// ❌ 错误使用
contextBridge.exposeInMainWorld('myAPI', {
  send: ipcRenderer.send
})

// 它直接暴露了一个没有任何参数过滤的高等级权限 API 。 这将允许任何网站发送任意的 IPC 消息，这不会是你希望发生的。 相反，暴露进程间通信相关 API 的正确方法是为每一种通信消息提供一种实现方法

// ✅ 正确使用
contextBridge.exposeInMainWorld('myAPI', {
  loadPreferences: () => ipcRenderer.invoke('load-prefs')
})

```
# 进程沙盒化
