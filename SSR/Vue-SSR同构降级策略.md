* [SSR同构降级策略](https://juejin.cn/post/6884107649843986440)

* SSR 中只能生成页面的内容和结构，并不能完成事件绑定，因此需要在浏览器中执行 CSR 的 JS 脚本，完成事件绑定，让页面拥有交互的能力，这个过程被称作`hydrate`(翻译为注水或者激活)。同时，像这样服务端渲染 + 客户端 hydrate 的应用也被称为同构应用。
* https://github.com/1391020381/Front-end-Advancement/tree/master/vue-ssr
* server.entry.js
* client.entry.js
* 服务端打包好,html 再与 client.entry.js混合
* 集成路由
* vue-ssr 路由跳转规则
* 集成vuex

* client.bundle.js
* index.html
* vue-ssr-client-manifest.json
* index.ssr.html
* vue-ssr-server-bundle.json


* 浏览器API兼容   
    - 环境变量区分  
    - polyfill  jsdom


```
const jsdom = require('jsdom');
const { window } = new JSDOM(`<!DOCTYPE html><p>Hello world</p>`);
const { document } = window;
// 挂载到 node 全局
global.window = window;
global.document = document;



```
* 自定义头部  vue-meta 

* 缓存   lru-cache  LRU   CDN


* 性能监控   Sentry
```
// main.js

import Vue from 'vue'
import App from './App.vue'
import createRouter from './router'
import createStore from './store'
// 箭头函数是默认返回一个 =>后面的

// 如果是服务端渲染,每个人都应该有一个自己的vue实例
export default ()=>{
   const router = createRouter()
   const store = createStore()
    const app = new Vue({
        router,
        store,
        render:h=>h(App)
    })
    return {app,router,store}
}

// client-entry.js
import createApp from './main'

const {app,router} = createApp()

router.onReady(()=>{
    app.$mount('#app')
})


// entry-client.js 优化方案
import 'es6-promise/auto'
import { createApp } from './app'
const { app, router, store } = createApp()
// 由于服务端渲染时，context.state 作为 window.__INITIAL_STATE__ 状态，自动嵌入到最终的 HTML 中。在客户端，在挂载到应用程序之前，state为window.__INITIAL_STATE__。
if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}
router.onReady(() => { 
  router.beforeResolve((to, from, next) => {
    const matched = router.getMatchedComponents(to)
    const prevMatched = router.getMatchedComponents(from) 
    let diffed = false
    const activated = matched.filter((c, i) => {
      return diffed || (diffed = prevMatched[i] !== c)
    })
    const asyncDataHooks = activated.map(c => c.asyncData).filter(_ => _)
    if (!asyncDataHooks.length) {
      return next()
    }
    Promise.all(asyncDataHooks.map(hook => hook({ store, route: to })))
      .then(() => {
        next()
      })
      .catch(next)
  })
	// 挂载在DOM上
  app.$mount('#app')
})



// server.entry.js

import createApp from './main'

// 服务端需要调用当前实例产生一个  vue实例

// 打包成node可以使用的文件
export default context => {
    return new Promise((resolve, reject) => {
      const { app, router, store } = createApp()
  
      router.push(context.url)
  
      router.onReady(() => {
        const matchedComponents = router.getMatchedComponents()
        if (!matchedComponents.length) {
          return reject({ code: 404 })
        }
  
        // 对所有匹配的路由组件调用 `asyncData()`
        Promise.all(matchedComponents.map(Component => {
          if (Component.asyncData) {
            return Component.asyncData({
              store,
              route: router.currentRoute
            })
          }
        })).then(() => {
          // 在所有预取钩子(preFetch hook) resolve 后，
          // 我们的 store 现在已经填充入渲染应用程序所需的状态。
          // 当我们将状态附加到上下文，
          // 并且 `template` 选项用于 renderer 时，
          // 状态将自动序列化为 `window.__INITIAL_STATE__`，并注入 HTML。
           context.state = store.state
  
          resolve(app)
        }).catch(reject)
      }, reject)
    })
  }

// store.js

import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default (context)=>{
    const store = new Vuex.Store({
        state:{
            name:''
        },
        mutations:{
            changeName(state){
                state.name  = 'justdoit'
            }
        },
        actions:{
            changeName({commit}){
                return new Promise((resolve,reject)=>{
                    setTimeout(()=>{
                        commit('changeName')
                        resolve()
                    },1000)
                })
            }
        }
    })
    // 如果浏览器执行的时候,我需要将服务器设置的最新状态 替换掉客户端的状态
    if(typeof window !=='undefined' && window.__INITIAL_STATE__){
        store.replaceState(window.__INITIAL_STATE__)
    }
    return store
}

// webpack.client.js


const merge = require('webpack-merge')
const base = require('./webpack-base')
const path = require('path')
const ClientServerRender = require('vue-server-renderer/client-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const resolve = (dir) => {
    return path.resolve(__dirname, dir)
}

module.exports = merge(base,{
    entry:{
        client:resolve('../src/client-entry.js')
    },
    plugins:[
        new ClientServerRender(),
        new HtmlWebpackPlugin({
            filename:'index.html',
            template:resolve('../public/index.html')
        })
    ]
})

// webpack.server.js

const merge = require('webpack-merge')
const base = require('./webpack-base')
const path = require('path')
const ServerRender = require('vue-server-renderer/server-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const resolve = (dir) => {
    return path.resolve(__dirname, dir)
}

module.exports = merge(base,{
    entry:{
        server:resolve('../src/server.entry.js')
    },
    target:'node',
    output:{
        libraryTarget:'commonjs2' // 把最终的结果导出到 module.exports
    },
    plugins:[
        new ServerRender(),
        new HtmlWebpackPlugin({
            filename:'index.ssr.html',
            template:resolve('../public/index.ssr.html'),
            excludeChunks:['server'] // 排除某个模块
        })
    ]
})


// server.js


const Koa = require('koa')
const Router = require('koa-router')
const Static = require('koa-static')
const fs = require('fs')
const path = require('path')
const app = new Koa()
const router = new Router()
const VueServerRender = require('vue-server-renderer')



const ServerBundle = require('./dist/vue-ssr-server-bundle.json')
const template = fs.readFileSync('./dist/index.ssr.html','utf8')
const clientManifest = require('./dist/vue-ssr-client-manifest.json')
const render = VueServerRender.createBundleRenderer(ServerBundle,{
    template, server 入口
    clientManifest
})
router.get('/',async ctx=>{
    ctx.body = await new Promise((resolve,reject)=>{
        // 方法必须写成回调函数的形式,否则css不生效
        render.renderToString({url:'/'},(err,data)=>{
            console.log(err)
            if(err) reject(err)
            resolve(data)
        })
    })
})

app.use(router.routes())
app.use(Static(path.join(__dirname,'dist')))
app.use(async ctx=>{
    // 前端切换是不会触发 koa路由
    // 如果在前端刷新路由 匹配不到 koa路由 
   try{
    ctx.body = await new Promise((resolve,reject)=>{
        // 方法必须写成回调函数的形式,否则css不生效

        // {url:ctx.url} 会传递给  server.entry.js
        render.renderToString({url:ctx.url},(err,data)=>{
            if(err) reject(err)
            resolve(data)
        })
    })
   }catch(e){
        ctx.body =  '404'
   }

})
app.listen(3000,()=>{
    console.log(`server is listen http://127.0.0.1:3000`)
})



```


* 降级 -> 客户端 怎么获取对应对接 asyncData方法