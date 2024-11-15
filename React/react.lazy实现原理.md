* [React.lazy()解析](https://juejin.cn/post/7223657494820765754#heading-1)
* https://juejin.cn/post/6844904191853494280
* 通过 import()、React.lazy 和 Suspense 共同一起实现了 React 的懒加载,也就是我们常说了运行时动态加载.

* import 原理

```
function import(url) {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    const tempGlobal = "__tempModuleLoadingVariable" + Math.random().toString(32).substring(2);
    script.type = "module";
    script.textContent = `import * as m from "${url}"; window.${tempGlobal} = m;`;

    script.onload = () => {
      resolve(window[tempGlobal]);
      delete window[tempGlobal];
      script.remove();
    };

    script.onerror = () => {
      reject(new Error("Failed to load module script with URL " + url));
      delete window[tempGlobal];
      script.remove();
    };

    document.documentElement.appendChild(script);
  });
}



```