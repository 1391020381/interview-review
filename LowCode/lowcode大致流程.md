* 全局代码


```
export function A (){
  console.log('aaa');
}

export function B(){
  console.log('bbb');
  A();
}

// 产物



  "exports": {
          "__esModule": true,
          "default": null,
          onAlert1: () => { alert("我是js模块中绑定的alert1事件") },
          onAlert2: () => {
            alert("我是js模块中绑定的alert2事件");
           console.log('调用onAlert1');
              // onAlert1();  注释避免报错
          },
      }

// 处理全局模块 会使用模式  moduel
// sandbox.huosScope.jsMoudle  注入到 sanbox.eval的 with的  作用域链顶部

// 其他具体 组件就可以引用
```