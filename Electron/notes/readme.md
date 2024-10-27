* electron前端开发工程师
1. 负责electron桌面应用开发;
2. 负责应用程序的架构设计、模块开发、组件集成和功能扩展;
3. 负责性能优化和代码调试，以确保应用程序的高效运行和稳定性:
4. 负责把Electron、Node.js生态系统将其应用到项目中;
5. 负责桌面端跨平台技术方案选型及重难点问题攻关;
6. 负责多平台应用的性能优化，达到业界领先
* 任职要求:
1. 精通javascript和typescript语言。
2. 精通css3，html5、saas、webpack等web基础技术，并且能优化前端渲染。
3. 至少有2年Electron 开发经验
    - 熟悉桌面端开发的基本工作流程及原理
    - 了解其架构设计原理
    - 知道怎么调用底层系统操作
    - 知道怎么调用c++提供的库文件
    - 知道http proxy操作。
4. 熟练掌握electron 项目打包，部署，更新，管理。
5. 熟悉远程调试，electron 的常见问题快速定位及解决办法。
6. 熟悉本地数据库操作。

# Electron架构设计与基本流程
* Electron 由 Nodejs + Chromium + Native API构成。
* Nodejs和基于不同平台的 Native API 加强的 Chromium浏览器。
* 主进程 
    - 管理应用程序生命周期
    - 创建窗口
    - 调用原生API
* 渲染进程
    -  负责展示用户界面的部分。
    -  每个渲染进程对应一个窗口(BrowserWindow) 或者一个网页。 
    - 通常由 HTML CSS JavaScript构建用户界面。
    - 渲染进程与主进程是分开的,它们之间通过 IPC(进程间通信)来进行通信。
* 预加载脚本 preload.js 
    - 预加载(preload)脚本包含了那些执行于渲染进程中,且先于网页内容开始加载的代码。
    - 在 preload.js中,我们不仅仅可以使用 Node API 还可以直接使用 Electron渲染进程的API 以及 DOM API
    - 在 preload.js 可以通过 IPC和主进程进行通信达成调用主进程模块的目的。

    - 预加载脚本可以在 BrowserWindow 构造方法中的 webPreferences选项里被附加到主进程。   
* contextIsolation
    - contextIsolation 是 Electron中重要的安全特性,用于提高渲染进程的安全性。 它的作用在于将渲染进程的 js上下文 与主进程隔离开来,以减少安全风险并加强安全性。
* 进程沙盒化
* Electron 中的消息端口
* 进程间通信

```
// preload.js
const { contextBridge } = require('electron')  
const fs = require('fs')
  
contextBridge.exposeInMainWorld('myAPI', {  
  exists: fs.exists  
})


```
# 调用底层API
* 知道怎么调用底层系统操作
* 知道怎么调用c++提供的库文件
* 知道http proxy操作。
    - ELectron的原生GUI能力
    - Electron操作系统底层能力
    - Nodejs的API
    - Node.js调用原生能力  Nodejs的C++


# electron 项目打包，部署，更新，管理。
* 全量更新
    - 检查本后提供一个下载链接
* 文件覆盖式更新
* 自动更新
    - electron-updater 
# 远程调试，electron 的常见问题快速定位及解决办法。
    - chrome-devtol
# 本地数据库操作。