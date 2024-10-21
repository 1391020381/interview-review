* [wujie](https://wujie-micro.github.io/doc/guide/start.html)

```
import { bus, setupApp,preloadApp,startApp,destroyApp } from 'wujie';

// wujie-vue  wujie-react

// 设置子应用

setupApp({ name: "唯一id", url: "子应用地址", exec: true, el: "容器", sync: true })

preloadApp({name:"唯一id"})

// 启动子应用

startApp({name:"唯一id"})


// 子应用 设置 cors

app.use((req, res, next) => {
  // 路径判断等等
  res.set({
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Allow-Origin": req.headers.origin || "*",
    "Access-Control-Allow-Headers": "X-Requested-With,Content-Type",
    "Access-Control-Allow-Methods": "PUT,POST,GET,DELETE,OPTIONS",
    "Content-Type": "application/json; charset=utf-8",
  });
  // 其他操作
});


// 子应用生命周期改造

if (window.__POWERED_BY_WUJIE__) {
  let instance;
  window.__WUJIE_MOUNT = () => {
    const router = createRouter({ history: createWebHistory(), routes });
    instance = createApp(App);
    instance.use(router);
    instance.mount("#app");
  };
  window.__WUJIE_UNMOUNT = () => {
    instance.unmount();
  };
} else {
  createApp(App).use(createRouter({ history: createWebHistory(), routes })).mount("#app");
}

 <!--单例模式，name相同则复用一个无界实例，改变url则子应用重新渲染实例到对应路由 -->
  <WujieVue width="100%" height="100%" name="vue2" :url="vue2Url" :sync="true"></WujieVue>

  
```

* [wujie & qiankun 原理浅析](https://juejin.cn/post/7307451255431987210)
# 应用加载机制和 js 沙箱机制
* 利用iframe实现沙箱,让子应用脚本在 iframe里运行,利用Web component的 custom element 和 shadow dom 实现样式隔离。
* 利用代理 iframe 的  document的查询类接口到 Web component上。实现两者的关联。

# 路由同步机制
* 在 iframe 内部进行 history.pushState，浏览器会自动在 joint seesion history 中添加 iframe 的 session-history，浏览器的前进、后退在不做任何处理的情况下就可以直接作用于子应用。

* 劫持 iframe 的 history.pushState 和 history.replaceState，就可以将子应用的 url 同步到主应用的 query 参数上，当刷新浏览器初始化 iframe 时，读回子应用的 url 并使用 iframe 的 history.replaceState 进行同步。

# 通信机制
* 承载子应用的 iframe 和主应用是同域名的,所以可以进行通信。
    - props注入  子应用 通过 $wujie.props可以拿到主应用的注入的数据
    - window.parent通信 子应用和主应用同源，可以通过 window.parent 和主应用通信。
    - window.document.querySelector("iframe[name=子应用id]").contentWindow.xxx
    - window.parent.xxx
* 去中心化的通信
* 通过 EventBus 事件总线实例，注入到主应用和子应用，实现去中心化通信。



# 常见问题
1. 跨域问题和cors设置
* 可能的原因分析：
* 子应用的资源和fetch接口的请求都在主域名发起，所以会有跨域问题，子应用必须做 cors 设置。资源或接口请求没有携带 cookie
* 解决办法:  子应用本身是用fetch发起请求，需要将子应用fetch的credentials设置为include，这样cookie才会携带上去。
或者在主应用自定义fetch并将fetch的credentials设置为include。
2. 子应用弹框位置不正确
* 冒泡系列组件（比如下拉框）弹出位置不正确
* 解决方案：子应用将body设置为 position: relative 即可
3. 子应用弹窗根据点击事件的 event.clientY 来确定top位置，但是主应用头部有导航栏导致位置计算不准确
* 解决方案：子应用弹窗dom元素添加 position: fixed 样式即可

# 常见优势
1. 对webpack  vite 支持
2. 组件化
3. 预加载指的是在应用空闲的时候requestIdleCallback将所需要的静态资源提前从网络中加载到内存中，详见preloadApp
4. 保活 保活模式
* 子应用的 alive 设置为true时进入保活模式，内部的数据和路由的状态不会随着页面切换而丢失。
* 在保活模式下，子应用只会进行一次渲染，页面发生切换时承载子应用dom的webcomponent会保留在内存中，当子应用重新激活时无界会将内存中的webcomponent重新挂载到容器上
* 保活模式下改变 url 子应用的路由不会发生变化，需要采用 通信 的方式对子应用路由进行跳转

* 路由模式