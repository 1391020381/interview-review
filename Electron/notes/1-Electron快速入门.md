* 通过 webview 加载其他的页面，当你使用 webview 的时候，也会对应一个渲染进程。
# 主进程和渲染进程通信
* 进程间通信,英文叫做 interprocess communication 简称叫做IPC。 这个 IPC进程通信机制是由操作系统所提供的一种机制,允许应用中不同进程之间进行一个交流。

* 在Electron中 我们需要关注进程间通信:
    - 主进程和渲染进程之间的通信。  ipcMain
    - 渲染进程彼此之间的通信。 ipcRenderer
    - MessageChnnel   MessageChannelMain

# 窗口
* 实际上对多个窗口进行管理,原理是非常简单的,主要就是将所有的窗口的引用存储到一个map里面,之后要对哪一个窗口进行操作,直接从map里面取出对应的窗口引用即可。

```
// 该 map 结构存储所有的窗口引用
const winMap = new Map();
// ...
// 往 map 里面放入对应的窗口引用
winMap.set(config.name, win);

// 关闭时剔除

```
# 应用常见设置


# 生命周期
* will-finish-launching：在应用完成基本启动进程之后触发
* ready：当 Electron 完成初始化后触发
* window-all-closed：所有窗口都关闭的时候触发，特别是在 windows 和 linux 里面，所有窗口都关闭则意味着应用退出
* before-quit：退出应用之前触发
* will-quit：即将退出应用的时候
* quit：退出应用的时候

# 渲染进程权限
1. 预加载脚本
* 在预加载脚本中，可以使用 Node.js 的 API，并且由于它是在渲染进程中，也可以使用渲染进程的 API 以及 DOM API，另外还可以通过 IPC 和主进程之间进行通信，从而达到调用主进程模块的目的

```
// preload.js
const fs = require("fs");

window.myAPI = {
  write: fs.writeSync,
};


webPreferences: {
  nodeIntegration: true,
  contextIsolation: false,
  preload: path.join(__dirname, "preload.js"),
},


```
# 上下文隔离
* 上下文隔离(contextIsolation) 是Electron里面的一个非常重要的安全特性,用于提高渲染进程里面的安全性。
* 从Electron12版本开始默认就开启,当然目前可以在webPreferences 里面设置关闭。
* 上下文隔离打开，主要是为了将渲染进程中的JS上下文环境和主进程隔离开,减少安全性风险。
* 在渲染进程中就是想要使用一些 Node.js 的相关模块，该怎么办呢？这里就可以通过预加载脚本来选择性的向渲染进程暴露，提高了安全性。



```
//创建菜单      标题菜单?
const menu = Menu.buildFromTemplate(menuArr);
// 设置菜单，让我们的自定义菜单生效
Menu.setApplicationMenu(menu);


/ 设置右键菜单
  // context-menu 事件会在用户点击右键时触发
  win.webContents.on("context-menu", () => {
    // contextMenu 是刚才导出的 Menu 实例
    // 在 Menu 实例上面有一个 pop 方法，可以弹出菜单
    // 这里接收了一个参数 win，回头上下文菜单就会在这个窗口上弹出
    contextMenu.popup(win);
  });

// contextMenu.js

// 创建一个上下文菜单的实例
const contextMenu = new Menu();
// 回头我们就可以往这个 Menu 实例里面添加菜单项（ MenuItem 的实例 ）
contextMenu.append(
  new MenuItem({
    label: "复制",
    role: "copy",
  })
);

```


1. 快速开始  加载页面
2. 主进程和渲染进程通信
3. 渲染进程通信
4. 上下文菜单
5. 预加载脚本
6. 窗口  保存窗口引用,即可操作对应窗口
7. 数据持久化  electron-store

* amplitudejs
* electron-store
* electron-reload  的主要作用是监视项目中的文件变化，并在检测到变化时自动重启 Electron 应用程序。这可以避免手动停止和启动应用程序的过程。应用在开发环境
* win.webContents.openDevTools()   打开调试模式
* electron-vite   
    - src  main 主进程代码  preload 预加载脚本 renderer 渲染进程相关代码 使用 vue相关技术
    - build  构建后的目录 存放构建后的文件
    - out目录 打包后的目录,打包的文件就存放于目录中,electron实际上加载的是此目录里面的内容
    - resources目录 公共资源目录,如果有图标 可执行文件 wasm文件等资源,可以将它们放在这个目录中。
        - 公共目录中的所有资源都不会复制到输出目录。所以在打包 app 的时候，公共目录应该一起打包。
        - 渲染进程中的公共资源处理不同于主进程和预加载脚本。
        - 默认情况下，渲染进程的工作目录位于 src/renderer，因此需要在该目录下创建公共资源目录。默认的公共目录名为 public，也可以通过 renderer.build.publicDir 指定。
    - electron-builder.yml 文件：和打包相关的配置文件，里面配置了不同操作系统，打包成不同产物的配置
    - 热更新 electron-vite dev --watch