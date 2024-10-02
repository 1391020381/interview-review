* sucrase

* 低代码平台当中,需要对当前编写的 JS模块进行一次构建, 将其转换为 兼容性和成熟度更好的资源产物。基于此,也就引申在县运行时构建的问题。

*  esmodule  import 和 export
*  commonjs 语法  module.exports 或 exports  


```
{
alert1: function alert1(),
alert2: function alert2()
default: "",
    "huos": {
        "app": {
            "message": {},
            "notification": {},
            "modal": {}
        }
    },
    "__esModule": true,
    "default": null
}

```

* 将信息添加到 vm 作用域头部
* 当有了cjs模块的时候,只需要将其执行后获取module.exports结果就是当前js模块所有声明的函数了。 然后再加载模块


* Function("require, exports, module", code)(require, module.exports, module);
* Function构造函数 用于创建一个新的函数对象
* 接收两个参数 第一个参数是函数的参数列表(以字符串的形式)  第二个是函数体(也是一段字符串)

* sandbox.huosScope.jsMoudle = module.exports   拿到 定义的函数


```
import _ from 'lodash';

export const onAlert = () =>{
    const test = {
        a:1
    }
    alert(_.get(test))
}

```
* 需要注意的是，这里一般是不推荐你直接传递本地的npm包的，在之前已经实现了远程依赖的加载，一般而言compileModuleResolve的来源都是在线安装的依赖包。后面要实现的就是基于容器的在线依赖安装，从而将代码模块逐步完善到接近本地开发级别的体验操作。


```

useAsyncEffect(async () => {
    const cjsCode = await sucraseTransformCode(jsMoudleCode)
    console.log(cjsCode, 'cjsCode')
    const { exports  } = compileModuleResolve(cjsCode, {
      dayjs,
      "@huso/store": {
        getState: () => {
          console.log('我是get方法')
        },
        setState: () => {
          console.log("我是set方法")
        }
      }
    });
    (window as any)[ScopeMoudleId] = {
      jsMoudle: exports
    }
  }, [jsMoudleCode])


```


![sucrase 依赖](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5477c6abb7ee4d55944d5f074e612477~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=3790&h=2238&s=573744&e=png&b=ffffff)


* 当前通过import引入进来的模块就可以被编译好的commonjs导出函数识别

* import { getState, setState } from '@huso/store'
* 达到事件改变状态，引导视图发生改变，控制不同组件绑定状态属性的展示




* Function
* eval


* lowcode
*  procode