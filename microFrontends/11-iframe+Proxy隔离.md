# iframe + Proxy

* 如何利用 iframe + Proxy 实现 JS 隔离，该隔离在 iframe 隔离的基础上解决了 history 的报错问题，从而可以兼容 Vue 或者 React 框架的隔离执行。当然，由于微应用和主应用共用 history，还可以额外去实现主子应用的历史会话同步问题。由于 Proxy 存在浏览器兼容性