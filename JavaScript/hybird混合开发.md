* [Hybrid App技术解析 -- 原理篇](https://juejin.cn/post/6844903640520474637)


* URL Schema   
    - h5 -> native iframe 特定 url 级参数和回调函数       
    - native -> h5  由于 Native 可以算作 H5 的宿主，因此拥有更大的权限，上面也提到了 Native 可以通过 WebView API直接执行 Js 代码.
    - ios  // Swift webview.stringByEvaluatingJavaScriptFromString("alert('NativeCall')")
    - android   webView.loadUrl("javascript:JSBridge.trigger('NativeCall')")
* js-core