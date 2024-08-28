* vue-server-renderer/client-plugin 
    - 主要任务是生成 vue-ssr-client-manifest.json
    - 这个文件包含了 webpack构建出来的客户端资源信息
    - 客户端的manifest会在服务器渲染过程中用来帮助自动推到和注入 预加载 预获取指令。 以及要加载哪些资源。
* vue-server-renderer/server-plugin
    - 服务器端构建过程中。 生成 bundle.json 
    - 包含了服务器端应用程序的全部代码  Vue组件 路由 Vuex 等。 服务端渲染函数使用这个来渲染。

* const render = VueServerRender.createBundleRenderer(ServerBundle,{
    template,
    clientManifest
})  



* server.entry.js
    - router.onReady
    - getMatchedComponents()
    - Componnent.asyncData  Vuex
    - window.state = store.state