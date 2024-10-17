* [pwa](https://web.dev/?hl=zh-cn)
* [一次性完整学完搭建PWA项目](https://juejin.cn/post/7260845826394144825)

* pwa 最终目的让你的app应用可以像app应用一样可以给到用户离线体验, 也就是 没有网络也可以正常访问一些资源。

* PWA在技术上主要分三个部分。
    - 主应用 就是平时我们开发网站所包含的内容 html js  css等。
    - Web app manifests 主要为 manifest.json 提供浏览器安装PWA所需的信息,例如应用程序名称和图标。
    - Service Worker 主要为js文件,提供基本的离线缓存资源能力。

* manifest.json 
    - 描述web网站的信息 名称 图标  
    - manifest.json 需要在网站中html文件中 head中引用
    - <link rel="manifest" href="/manifest.json" />


```
// manifest.json

{
  "name": "网站完整名称", 
  "short_name": "网站简称", // 在没有足够空间显示 Web 应用程序的全名时使用
  "start_url": ".", // 从启动应用程序时加载的 URL。如果以相对 URL 的形式给出，则基本 URL 将是 manifest 的 URL
  "display": "standalone", // 访问网站窗口展示模式，如：fullscreen/standalone
  "background_color": "#fff", // 背景颜色
  "description": "网站描述",
  "icons": [ // 网站图标
    {
      "src": "images/touch/homescreen48.png",
      "sizes": "48x48",
      "type": "image/png"
    },
    {
      "src": "images/touch/homescreen72.png",
      "sizes": "72x72",
      "type": "image/png"
    },
    {
      "src": "images/touch/homescreen96.png",
      "sizes": "96x96",
      "type": "image/png"
    },
    {
      "src": "images/touch/homescreen144.png",
      "sizes": "144x144",
      "type": "image/png"
    },
    {
      "src": "images/touch/homescreen168.png",
      "sizes": "168x168",
      "type": "image/png"
    },
    {
      "src": "images/touch/homescreen192.png",
      "sizes": "192x192",
      "type": "image/png"
    }
  ],
}


```

* Service Worker
    - Service Worker 是注册在指定源和路径下的事件驱动worker。 它采用 js文件的形式,控制关联的页面或网站,拦截并修改访问和资源请求, 细粒度地缓存资源。
    - 区别于主 js线程 运行在其他单独线程,但是必须要注册到主js线程中
    - 用js编写
    - 可以拦截并修改和资源请求，从而实现资源缓存。
    - 出于安全考量 Service Worker只能由HTTPS承载 毕竟修改网络请求的能力暴露给中间人攻击会非常危险,如果允许访问这些强大的API 此类攻击将会变得很严重。

* 生命周期
    - 注册 使用 ServiceWorkerContainer.register() 方法首次注册 service worker 
    - 下载  页面首次加载后会下载ServiceWorker或者过去24小时没有被下载会再次下载
    - 安装 首次启用 service worker，页面会首先尝试安装，如果现有 service worker 已启用，新版本会在后台安装，但仍不会被激活——这个时序称为 worker in waiting。 
    - 激活  首次启用 service worker，安装结束后会直接激活，新版本的service worker会直到所有已加载的页面不再使用旧的 service worker 才会激活新的 service worker，但是可以通过ServiceWorkerGlobalScope.skipWaiting() 可以更快地进行激活。

* Service Worker提供几个事件用来监听生命周期的变化，如下：
    - self.addEventListener("install") 该事件触发时的标准行为是准备 service worker 用于使用，例如使用内建的 storage API 来创建缓存，并且放置应用离线时所需资源。
    - self.addEventListener("activate") 事件触发的时间点通常是清理旧缓存以及其他与你的 service worker 的先前版本相关的东西。
    - self.addEventListener("fetch")  事件触发的时间点是每次获取 service worker 控制的资源时，都会触发 fetch 事件
    - 这里的this代表的是 Service Worker 本身对象。


* 常见API
    - navigator.serviceWorker.register() 主 JavaScript 线程注册 Service Worker 方法
    - Cache 与 CacheStorage 用来控制缓存