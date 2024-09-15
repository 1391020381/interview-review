* 主应用和各个微应用的全局变量属性冲突 CSS样式冲突和存储数据冲突等问题


* 子应用提供 mount unmout的方法   打包 npm   -> 主应用 引用 npm包  使用  mount unmount 挂载


* 封装NPM包的方式实现了微前端,该方案需要我们设计时导出 mount  unmount API,从而可以使主应用进行微应用的加载和卸载处理。
* NPM包形式的微应用发布后,往往需要主应用升级相应NPM版本依赖并进行构建处理。

```

import { createApp } from "vue";
import App from "./App.vue";
let app;

export function mount(containerId) {
  console.log("vue app mount");
  app = createApp(App);
  app.mount(`#${containerId}`);
}

export function unmount() {
  console.log("vue app unmount: ", app);
  app && app.unmount();
}



```