# Web Components 方案

* Web Components 可以理解为浏览器的原生组件,它通过组件化的方式封装微应用,从而实现应用自治。

* 这节在 动态Script方案的基础上 实现 简单的Web Components

1. 通过请求获取后端的微应用列表数据，动态进行微应用的预获取和导航创建处理
2. 根据导航进行微应用的切换，切换的过程会动态加载并执行 JS 和 CSS
3. JS 执行后会在主应用中添加微应用对应的自定义元素，从而实现微应用的加载
4. 如果已经加载微应用对应的 JS 和 CSS，再次切换只需要对自定义元素进行显示和隐藏操作
5. 微应用自定义元素会根据内部的生命周期函数在被添加和删除 DOM 时进行加载和卸载处理


* [Web Components](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_components)
    - 使用自定义元素
    - 使用影子DOM
    - 使用模版和插槽