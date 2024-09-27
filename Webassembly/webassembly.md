* [初识WebAssembly](https://juejin.cn/post/7229623485240049722)


* WebAssembly的工作原理是将高级编程语言(C C++等)编译为 WebAssembly字节码,再通过WebAssembly的解释器或者即时编译器,将字节码转换为机器码,最终在浏览器上执行。



* [WebAssembly完全入门——了解wasm的前世今身](https://juejin.cn/post/6844903709806182413?searchId=2024092711273801BF790B99BBB5778CDE)

* Emscripten

```
// test.c

int add (int a,int b){
    return a + b
}


const fibonacciUrl = './fibonacci.wasm';
const {_fibonacci} = await this.getExportFunction(fibonacciUrl);

getExportFunction = async (url) => {
    const env = {
      memoryBase: 0,
      tableBase: 0,
      memory: new WebAssembly.Memory({
        initial: 256
      }),
      table: new WebAssembly.Table({
        initial: 2,
        element: 'anyfunc'
      })
    };
    const instance = await fetch(url).then((response) => {
      return response.arrayBuffer();
    }).then((bytes) => {
      return WebAssembly.instantiate(bytes, {env: env})
    }).then((instance) => {
      return instance.instance.exports;
    });
    return instance;
};




```

* emcc test.c -Os -s WASM=1 -s SIDE_MODULE=1 -o test.wasm
    - emcc 就是 Emscripten编译器
    - test.c 是我们的输入文件
    - -0s 表示这次编译需要优化
    - -s WASM=1 表示输出wasm的文件 
    - -s SIDE_MODULE=1 表示只要一个模块
    - -o test.wasm 是我们的输入文件
    - pre.js


// webworker  webassembly  pre.js



```

// sum.js
var Module = {
    onRuntimeInitialized: function() {
        // WebAssembly 模块加载完成后执行的回调函数
        console.log("WebAssembly module loaded");
    }
};

// 导出的函数
Module.ccall = function(signature, returnType, argTypes, args) {
    // 调用 WebAssembly 函数的逻辑
};

// 其他胶水层代码...



// html

<!DOCTYPE html>
<html>
<head>
    <title>WebAssembly Example</title>
    <script src="sum.js"></script>
</head>
<body>
    <script>
        Module.onRuntimeInitialized = function() {
            // 调用 WebAssembly 函数
            var result = Module.ccall(
                'add',  // 函数名
                'number',  // 返回类型
                ['number', 'number'],  // 参数类型
                [1, 2]  // 参数值
            );
            console.log('Result:', result);  // 输出: Result: 3
        };
    </script>
</body>
</html>

```