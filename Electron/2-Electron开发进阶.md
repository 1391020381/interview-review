# Electron开发进阶
1. 应用打包
2. 应用更新
3. 单元测试
4. 应用安全性
5. 异常处理
6. 日志处理
    - 日志的记录
    - 日志的上传


 1. electron-builder

 # 打包mac应用
    - electron-icon-builder 可以快速的基于我们所提供的图标模板生成一套不同尺寸的图标。
* skipped macOS application code signing  reason=cannot find valid "Developer ID Application" identity or custom non-Apple code signing certificate, it could cause some undefined behaviour, e.g. macOS localized description not visible, see https://electron.build/code-signing allIdentities=     0 identities found

* 上面提示表示 跳过了代码签名的验证

* 解决这个问题,需要有一个有效的Apple开发者证书,然后需要执行如下的步骤
    - 加入苹果开发者计划, 如果还没有，你需要加入苹果开发者计划。这通常涉及到一些费用。
    - 创建并下载证书: 登录到你的苹果开发者账户，然后在证书、标识符和配置文件部分创建一个新的“Developer ID Application”证书。创建并下载这个证书到你的电脑。
    - 安装证书到钥匙串: 双击下载的证书文件，它会自动添加到你的钥匙串访问中。这样，electron-builder 就能在打包应用程序时使用这个证书了。
    - 在 electron-builder配置中指定证书: 在你的 electron-builder 配置文件中（通常是 package.json 中的 build 部分），确保正确设置了代码签名的配置。例如，你可以在配置中指定证书的名称或位置。
    - 重新打包应用程序:完成上述步骤后，再次使用 electron-builder 打包你的应用程序。这次应该不会出现之前的提示，因为 electron-builder 现在能找到并使用你的开发者 ID 证书进行代码签名了。

 ```

"mac": {
  "category": "public.app-category.utilities",
  "target": ["dmg", "zip"],
  "identity": "Developer ID Application: [你的开发者名]"
}

 ```   
 * 打包文件说明:
    - Markdown Editor-1.0.0-arm64.dmg.blockmap：这个文件是和 dmg 文件相关的 map 文件，该文件主要的作用是为了支持增量更新。
    - com.duyi.markdown.plist：这是一个属性列表文件，通常用于 macOS 程序存储一些配置信息，例如应用程序的标识符、版本信息、安全权限等。
    - builder-debug.yml：通常是记录 electron-builder 详细的构建过程的日志信息。
    - builder-effective-config.yaml：该文件包含了在使用 electron-builder进行打包的时候，实际所使用的配置信息。也就是说，electron-builder 有一个默认的基础配置，然后结合我们所给的 build 配置，最终所生成的，实际所用的配置。

# 打包windows应用




# asar文件
* asar基本介绍
* asar 英语全称 Atom Shell Archive。翻译成中文“Atom层文件归档”。这个其实就是一种 Electron 自定义的文件格式而已。
* 在 Electron 应用进行构建的时候，会把所有的源代码以及相关的资源文件都打包到这个文件里面。

* Electron 之所以使用自定义的 asar 文件来存储源代码，有两个原因：
    - 性能优化：asar 文件是一个归档文件，这意味着将原本项目中成百上千的小文件合并成了一个单文件。那么操作系统在加载文件的时候，也就只需要加载一个大文件，而非数千个小文件。在某些操作系统中，可以显著的提高读取速度和应用启动的速度。
    - 避免文件路径的限制：例如在 windows 操作系统中，默认最长的资源路径的长度为 256 位字符串，那么打包为 asar 归档文件之后，使用的是虚拟路径，绕开了外部文件系统的限制。


# 制作asar
* Electron 官方是提供了相应的工具，帮助我们制作 asar

# 使用asar

# asar文件的意义
* 实际上像 electron-builder 这样的打包工具，一般在默认情况下也是将项目里面的所有文件进行 asar 归档操作。
* 也方便我们后期介绍诸如像差分升级、electron-builder原理一类的知识。

# 应用更新
* 关于更新，我们这里存在两个的方面的准备工作：
    - 应用本身要有检查更新的能力  electron-updater
    - 准备一个提供资源的服务器


# 应用安全性
* IPC 可用于在主进程和渲染进程之间通信，而 preload 脚本可以扩展渲染进程的功能，提供必要的操作权限，这种责任分离使我们能够应用最小权限原则。    

# 异常处理

# 日志系统

# Sentry
* @sentry/electron
* [Self-Hosted Sentry](https://develop.sentry.dev/self-hosted/)

* 接口性能 错误   埋点


* [Electron-vite-使用 Electron Builder 分发应用程序](https://cn.electron-vite.org/guide/distribution#%E4%BD%BF%E7%94%A8-electron-builder-%E5%88%86%E5%8F%91%E5%BA%94%E7%94%A8%E7%A8%8B%E5%BA%8F)


* electron->  musicapp  -> 打包后  info.list   projectname  ->  electron-builder.yml

* @electron/asar 制作 asar
* electron-vite 打包默认情况下都是基于 Electron builder


* electron-updater 使用 electron-delta：electron-delta 是一个第三方库，可以帮助你实现增量更新。你可以使用它来计算和应用增量更新。