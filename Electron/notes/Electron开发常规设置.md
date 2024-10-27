* 网络请求


* 优雅地显示窗口
    - 使用 ready-to-show 事件
    - 在加载页面时，渲染进程第一次完成绘制时，如果窗口还没有被显示，渲染进程会发出 ready-to-show 事件 。 在此事件后显示窗口将没有视觉闪烁
    - 设置 backgroundColor 属性  对于一个复杂的应用，ready-to-show 可能发出的太晚，会让应用感觉缓慢。 在这种情况下，建议立刻显示窗口，并使用接近应用程序背景的 backgroundColor


# 自定义窗口

* BrowserWindow 的构造中将 frame 参数设置为 false。
* 默认情况下,无边框窗口不可以拖拽。

```
// main.js
const { BrowserWindow } = require('electron')
const win = new BrowserWindow({ frame: false })

```
1. 使用 -webkit-app-region:drag
    - 应用程序需要在CSS中指定 -webkit-app-region:drag 来告诉Electron哪些区域是可拖拽的(如操作系统的标题栏),当前只支持矩形形状区域。
    - <body style="-webkit-app-region: drag"></body>
    - 在某部分 windows 上使用 -webkit-app-region:drag 来设置拖拽,那么请记住需要在可拖拽区域内部使用 -webkit-app-region:no-drag 来将其中部分需要交互的区域排除。
    - 不然那些需要交互的元素几乎无法响应所有的鼠标事件,包括点击 拖拽等。
```
<body style="-webkit-app-region: drag">
   <button style="-webkit-app-region: no-drag;">click</button>
</body>

```
2. 自定义拖拽
    - 鼠标的 mousedown 和 mouseup 事件必须要和 DOM 绑定
    - 渲染进程  监听 事件 与  主进程通信 然后设置 窗口的位置
3. electron-drag
    - electron-drag 模块使用 osx-mouse 或 win-mouse 模块来跟踪整个屏幕上的鼠标位置，从而实现了一致的窗口拖动，同时受影响的元素仍能够接收 DOM 事件。使用方式也非常方便：

```
// app.vue
import drag from 'electron-drag-latest';

const undrag = drag('#app');

// 如果不需要拖拽，调用 undrag 函数
// undrag()


```    

* 自定义标题栏
    - 无边框窗口是一种不带外壳(包括 窗口边框 工具栏) 只包含有网页内容的窗口。
    - 希望包含 工具栏 标题。  窗口最大化 最小化 关闭, 融入自定义能力  需要自定义标题栏。

```
new BrowserWindow({
  // ... 
  // 设置 macOS 下红绿灯的位置
  trafficLightPosition: { x: 12, y: 21 },
  // ...
})


new BrowserWindow({
  autoHideMenuBar: true,
  // 无边框窗口
  frame: true,
  // 无标题
  titleBarStyle: 'hidden',
  show: false,
});

// 渲染进程自定义UI

// 最小化
const minimize = () => {
  ipcRenderer.send('detach:service', { type: 'minimize' });
};
// 最大化
const maximize = () => {
  ipcRenderer.send('detach:service', { type: 'maximize' });
};
// 关闭窗口
const close = () => {
  ipcRenderer.send('detach:service', { type: 'close' });
};

ipcMain.on('detach:service', async (event, arg: { type: string }) => {
  operation[arg.type]();
});

const operation = {
  minimize: () => {
    win.focus();
    win.minimize();
  },
  maximize: () => {
    win.isMaximized() ? win.unmaximize() : win.maximize();
  },
  close: () => {
    win.close();
  },
};


```    
# Electron文件上传


# Electron应用注入到系统右键菜单
    - 应用右键菜单
    - 应用菜单