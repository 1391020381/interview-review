* 应用程序打包 @electron/packager
* 代码签名，例如 @electron/osx-sign
* 创建特定平台的安装程序，例如 windows-installer 或 electron-installer-dmg
* 本地 Node.js 原生扩展模块重新构建 @electron/rebuild
* 通用 macOS 构建 @electron/universal

* [不联网的情况下，使用 electron-builder 快速打包全平台应用](https://cloud.tencent.com/developer/article/1950081)
* 需要注意的是打包成不同平台的安装包需要我们使用不同的操作系统进行打包。比如我们需要打包 .dmg、.exe、.deb 这三个安装包文件，那么我们就需要使用三套操作系统来分别打包。

* 关于各平台 Electron 镜像
    - 在有网络的情况下，由于我们设置了 NPM 镜像和 Electron 源，速度还是很快的。
    - 但我这边是内网打包，没法联网，所以，需要取个巧，在打包开始之前就将对应平台的 Electron 源下载下来放到各自的 NPM 缓存中去。
    - electron-builder 在打包的时候，会根据系统的不同去各自的 NPM 缓存目录下查找对应版本的 Electron 源，当我们将下载好的源放在 NPM 缓存中后，就不需要再去联网拉去了。

```
{
	
	"scripts": {
		"dev": "electron . --enable-loggin --no-sandbox",
		"build-64": "electron-builder --win --x64",
		"build-linux": "electron-builder --linux",
		"build-mac": "electron-builder --mac"
	}
	
}

```
* Electron Builder

* 数字签名
    - windows  .pfx
    - apple 开发者   
```
"build": {
  "appId": "XXXX",
  "productName": "XXX",
  "win": {
    // 以下是证书签名配置
    "verifyUpdateCodeSignature": false,
    "signingHashAlgorithms": [
      "sha256"
    ],
    "signDlls": false,
    "rfc3161TimeStampServer": "http://timestamp.comodoca.com/rfc3161",
    "certificateFile": "XXX.pfx",
    "certificatePassword": "XXXX"
  }
}

// apple

import { notarize } from 'electron-notarize';

async function packageTask () {
  await notarize({
    appBundleId, // bundleId
    appPath, // 文件路径
    appleId, // apple公证账号
    appleIdPassword, // apple公证专用密钥
    ascProvider, // 证书提供者
  });
}

xcrun stapler staple "electron-app.dmg"
```

# 打包 mac应用
* 图标
* npm install electron-icon-builder -D
* "build-icon": "electron-icon-builder --input=./assets/markdown.png --flatten"

# 打包 windows应用
* 图标 对应的是一个具体的ico格式的文件,而非一组文件。
* nsis 配置 打包出来就是 exe文件。
    - oneClick:false

# asar文件


# electron-updater

* autoUpdater.autoDownload = false
* autoUpdater.on("update-available",()=>{}) dialog

```
mainWindow.once('ready-to-show', () => {
  autoUpdater.checkForUpdates();
});

let version;
let releaseNotes;
// 默认会自动下载新版本
// 如果不想自动下载，设置 autoUpdater.autoDownload = false
autoUpdater.on('update-available', (info) => {
  // 获取 版本号、发布日志
  { version, releaseNotes } = info;
  console.log('有新版本');
});

// 监听下载进度
autoUpdater.on('download-progress', ({ percent }) => {
  console.log('下载进度', percent);
});

// 下载完成
autoUpdater.on('update-downloaded', () => {
  console.log('下载完成');
   dialog
    .showMessageBox(mainWindow, {
      title: '版本更新',
      message: `发现新版本${version}，是否更新\n\n${releaseNotes}`,
      type: 'info',
      buttons: ['稍后提示', '立即更新'],
    })
    .then(({ response }) => {
      console.log(response);
      if (response === 1) {
        autoUpdater.quitAndInstall();
      }
    });
});

```
1. 手动全量更新核心原理是启动 Electron应用程序的时候获取服务器当前软件最新版本号和本地软件中的 package.json 版本进行匹配。 如果发现落后于服务器版本则进行更新提示,并引导用户进行手动下载安装。


2. 文件覆盖式更新
    - 在 macOS 上确实可以，在需要更新时，下载新的 asar 包覆盖旧的 asar 包并重启应用即可，而且在应用程序运行的过程中，依然可以操作覆盖，不影响正常使用。
    - 


* [增量更新](https://juejin.cn/post/7250288616533491749?searchId=20231222144125C40E2E68EAD7905996F0#heading-1)    