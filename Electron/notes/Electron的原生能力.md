* ELectron的原生GUI能力
    - BrowserWindow 应用窗口
    - Tray托盘
    - Notification 通知
    - Menu 菜单
    - dialog 原生弹窗
* Electron操作系统底层能力
    - clipboard 剪贴板
    -  globalShortcut 全局快捷键
    - screen 屏幕
    - desktopCapturer 音视频捕捉  
* Nodejs的API
    - preload.js
* Node.js调用原生能力
    - 当一个Nodejs的C++模块在OSX下编译会得到一个后缀是 *.node的模块,本质上是 *.dylib的动态链接库
    - 而在Windows上本质上是 *.dll的动态链接库
    - 在Linux下则是 .so的动态链接库
* node-gyp
    - node-gyp是一个 Nodejs包,它用于构建Nodejs C++拓展。
* 编写C++拓展的几种方式
    - NAN（Native Abstractions for Node.js）
    -  N-API（Node-API）
        - 提供了一个稳定的、应对 Node.js 版本变化的抽象层，允许开发者编写与 Node.js 引擎解耦的代码。这意味着，即使 Node.js 更新版本，使用 N-API 编写的插件也可以继续在新版本上运行。
    - node-addon-api  
        - Node-addon-api 是构建在 NAPI 之上的，提供了更加简单的 API，使得扩展开发者可以更加容易地编写跨版本、跨平台的扩展。它还提供了一些方便的功能，如自动内存管理、V8 值的类型转换等。

* binding.gyp
    - 是一个用于描述 Node.js 插件构建过程的配置文件。这个文件使用 JSON 格式，但它实际上是为了描述构建系统（例如 Node-gyp）所需的构建配置和元数据。
* 使用 node-bindings包
    - 在 index.js 文件中，直接通过相对路径的方式引用了编译好的 .node 文件。但是在大多数情况下，由于 Node.js Addon 存在各种不同的方案、构建配置，那 .node 文件产物的位置可能也会因此不同，所以我们需要借助一个 node-bindings 包来自动为我们寻找 .node 文件的位置

```
const addon = require('bindings')('hello.node');

module.exports = addon;


```
* 使用 node-pre-gyp
    - node-pre-gyp 允许开发者将预编译的 Node.js 插件发布到各种平台（Windows、macOS、Linux 等）。这样，用户可以在安装时直接获取预编译的二进制文件，而不需要在他们的机器上进行编译。
    - 这个时候，你的 package.json 需要指定对应编译好的 .node 文件下载地址，并添加一个 install 钩子，让用户在执行 npm install 的时候，通过 node-pre-gyp install 寻找预编译好的二进制 .node 文件。
    - node-pre-gyp 会先检查项目本地是否已经存在二进制构建文件，当不存在时进入用户本地查找，当用户本地也不存在时会执行 http 下载。

```
"dependencies"  : {
  "@mapbox/node-pre-gyp": "1.x"
},
"devDependencies": {
  "aws-sdk": "2.x"
}
"scripts": {
  "install": "node-pre-gyp install --fallback-to-build"
},
"binary": {
  "module_name": "your_module",
  "module_path": "./lib/binding/",
  "host": "https://your_module.s3-us-west-1.amazonaws.com"
}


```

* electron上引入原生模块
    - 如果你使用的 C++ 扩展是通过安装时编译而不是预编译的方式实现的，那么 Electron 在引入包进行本地编译时，编译出的原生模块不一定能在 Electron 应用中正常工作，有可能会报以下错误
    - 原因就是我们前面提到了，Electron 自己内部集成了一个 Node.js 环境，那么就有可能出现 Electron 内置的 Node.js 的版本可能与你编译原生模块使用的 Node.js 的版本不同 的情况。


* rust开发electron拓展


* Node调用os脚本

```
const { execFile } = require('child_process');

const exeRes = execFile('C:\\xxx.exe');

exeRes.on('exit', () => {
  if (code) {
    //  todo
  }
});

// mac

const applescript = require('applescript');

// 非常基本的 AppleScript 命令。以 'Array' 形式返回 iTunes 中当前选定音轨的歌曲名称。
const script = 'tell application "iTunes" to get name of selection';

applescript.execString(script, (err, rtn) => {
  if (err) {
    // Something went wrong!
  }
  if (Array.isArray(rtn)) {
    for (const songName of rtn) {
      console.log(songName);
    }
  }
});

// windows

const { Geolocator } = require('windows.devices.geolocation')
const locator = new Geolocator()

locator.getGeopositionAsync((error, result) => {
  if (error) {
    console.error(error)
    return
  }

  const { coordinate } = result
  const { longitude, latitude } = coordinate

  console.info(longitude, latitude)
})


```