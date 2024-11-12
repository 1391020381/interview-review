* [Webpack - 手把手教你写一个 loader / plugin](https://juejin.cn/post/6976052326947618853)

* 一个loader 就是一个 nodejs模块。
    - 他导出的一个函数,这个函数只有一个入参,这个参数就是一个包含资源文件内容的字符串
    - 而函数的返回值就是处理后的内容。 也就是说，一个简单的loader长这样。
* 当一个loader被使用的时候，他只可以接收一个入参,这个参数是一个包含资源文件内容的字符串。
```
module.exports = function (content){
    // content 就是传入的源内容字符串。
    return content
}

module.exports = function (content){
    // 获取到用户传给当前loader的参数
    const options = this.getOptions()
    const res = someSyncOperation(content,options)
    this.callback(null,res,sourceMaps);
    // 注意这里由于使用 this.callback 直接return 就行
    return 
}

module.exports = function (source){
    const options = this.getOptions();
    this.callback(null,addSign(source,options,sign))
    return
}

function addSign(content,sign){
    return return `/** ${sign} */\n${content}`
}

// webpack 配置

module:{
    reule:[
        test:/\.js$/,
        use:[
            {
                loader:"company-loader",
                options:{
                    sign:'we-doctor@2021'
                }
            }
        ]
    ]
}

// 产物
/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/** we-doctor@2021 */
function fn() {
  
  return "1234"
}
/******/ })()
;

```


```
// vite

import { Plugin } from 'vite';

const copyrightPlugin: Plugin = {
  name: 'add-copyright',
  transform(code, id) {
    if (/\.js$/.test(id)) {
      const copyright = '// 这是一个示例版权声明';
      return `${copyright}\n\n${code}`;
    }
    return code;
  },
};

export default copyrightPlugin;


```