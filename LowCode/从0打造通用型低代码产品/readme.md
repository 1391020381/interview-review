* [讲讲我做低代码平台这一年](https://juejin.cn/post/7254104833514618917)

* pnpm workspace组织代码,并抽离以下核心功能。
1. 利用HOC能力,抽取物料组件craftjs功能。
2. 利用 iframe沙盒提供动态执行js能力。
3. 使用sucrase 和 @monaco-editor/react提供在线代码编能力。
4. 使用zustand提供全局状态能力。
5. 结合 2、3、4、实现动态逻辑执行和组件事件联动。
5. 封装属性面板setter/fields方便业务开发更专注业务组件开发。
6. 业务组件库且区分编辑器环境与真实渲染环境。
7. NestJS TypeORM作为服务端，保存发布页面信息。



* pnpm monorepo的项目,主要有三个项目,以及几个核心包。
    - editor 编辑器项目
    - site  发布页面管理项目
    - Server NestJS服务端,提供接口保存数据。
    - 核心包   
        - HOC  
        - iframe 
        - build 
        - zustand    
        - components  
            - index.tsx createReactMaterial(View,{}) 物料
            - panel.tsx 属性面板
            - view.tsx 纯组件
        - setter/fields

![JS模块](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/47a875816f6a46ffae25998d748066f0~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=2560&h=1348&s=269611&e=png&b=fefefe)

* @huos/store

```
import request from 'umi-request';
import { set,get,redis,remote } from '@huos/store'

export const fetchData  = async(cb)=>{
    // 获取表状态
    const status = get((state) => state.mockStatus)

    const data = await = request.get(`http://127.0.0.1:4523/m1/1089862-0-default/get/findByStatus?status=${status}`)

    if(data){
        set((state)=>{
            state.mockData = data;
        })
    }

    cb()
}

```

* 绑定多个函数,并且通过 pipeline进行串联


* 回滚  保存两份 jsonschema 重新编译

* 组件单独发布  json 中版本号