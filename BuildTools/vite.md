# Vite

* 在开发阶段 Vite 通过 Dev Server 实现了不打包的特性，而在生产环境中，Vite 依然会基于 Rollup 进行打包，并采取一系列的打包优化手段。

```
"scripts": {
  // 开发阶段启动 Vite Dev Server
  "dev": "vite",
  // 生产环境打包
  "build": "tsc && vite build",
  // 生产环境打包完预览产物
  "preview": "vite preview"
},


```

* tsc 作为 TypeScript 的官方编译命令，可以用来编译 TypeScript 代码并进行类型检查，而这里的作用主要是用来做类型检查，我们可以从项目的tsconfig.json中注意到这样一个配置

```

{
  "compilerOptions": {
    // 省略其他配置
    // 1. noEmit 表示只做类型检查，而不会输出产物文件
    // 2. 这行配置与 tsc --noEmit 命令等效
    "noEmit": true,
  },
}


```

# CSS 预处理器
* Vite本身对CSS各种预处理语言(Sass/Scss Less Stylus) 做了内置支持。
* 也就是说，即使你不经过任何的配置也可以直接使用各种 CSS 预处理器。
* 由于 Vite 底层会调用 CSS 预处理器的官方库进行编译，而 Vite 为了实现按需加载，并没有内置这些工具库，而是让用户根据需要安装

# CSS Modules
* CSS Modules 在 Vite 也是一个开箱即用的能力，Vite 会对后缀带有.module的样式文件自动应用 CSS Modules。

# PostCSS
* 一般你可以通过 postcss.config.js 来配置 postcss ，不过在 Vite 配置文件中已经提供了 PostCSS 的配置入口

# 静态资源
1. 一方面我们需要解决资源加载的问题，对 Vite 来说就是如何将静态资源解析并加载为一个 ES 模块的问题；
2. 另一方面在生产环境下我们还需要考虑静态资源的部署问题、体积问题、网络性能问题，并采取相应的方案来进行优化。
* vite-plugin-imagemin

# 依赖预构建
* Vite提倡 no-bundle的构建工具。
* 我们所说的模块代码其实分为两部分,一部分源码,也就是业务代码,另一部分时第三方依赖, 即 node_modules中的代码。
* 所谓的 no-bundle只是对源代码而言,对于第三方依赖而言,Vite还是选择bundle，并且使用速度极快的打包器Esbuild来完成这一过程,达到秒级的依赖编译速度。
* Vite是基于浏览器原生ES模块规范实现的Dev Server 不论是应用代码 还是第三方依赖的代码，理应符合ESM规范才能够正常运行。
* 但 我们无法控制第三方的打包规范。

* 依赖预构建主要做了两件事情:
  - 将其他格式(UMD CommonJS)的产物转换为ESM格式,使其在浏览器通过 <script type="module"><script>的方式正常加载。
  - 打包第三方库的代码，将各个第三方库分散到文件合并到一起,减少http请求数量，避免页面加载性能劣化。
  - 两件事全部由 Esbuild完成。
* 如何开启预构建
  - 自动开启
  - 手动开启  node_modules/.vite    optimizeDeps.force 设为true    npx vite --force

 # 双引擎
 * Esbuild
    - 依赖预构建
    - 单文件编译
    - 代码压缩
 * Rollup 
    - 生成环境 Bundle


* Esbuild 作为构建的性能利器，Vite 利用其 Bundler 的功能进行依赖预构建，用其 Transformer 的能力进行 TS 和 JSX 文件的转译，也用到它的压缩能力进行 JS 和 CSS 代码的压缩。    



# 代码分割:打包完产物体积太大，怎么拆包

* bundle 指的是整体的打包产物，包含 JS 和各种静态资源。
* chunk指的是打包后的 JS 文件，是 bundle 的子集。
* vendor是指第三方包的打包产物，是一种特殊的 chunk。


* 小结一下，Vite 默认拆包的优势在于实现了 CSS 代码分割与业务代码、第三方库代码、动态 import 模块代码三者的分离。
* 但缺点也比较直观，第三方库的打包产物容易变得比较臃肿，上述例子中的vendor.js的大小已经达到 500 KB 以上，显然是有进一步拆包的优化空间的，这个时候我们就需要用到 Rollup 中的拆包 API ——manualChunks 了。

* 自定义拆包策略

```
// vite.config.ts
{
  build: {
    rollupOptions: {
      output: {
        // manualChunks 配置
        manualChunks: {
          // 将 React 相关库打包成单独的 chunk 中
          'react-vendor': ['react', 'react-dom'],
          // 将 Lodash 库的代码单独打包
          'lodash': ['lodash-es'],
          // 将组件库的代码打包
          'library': ['antd', '@arco-design/web-react'],
        },
      },
    }
  },
}


```
* vite-plugin-chunk-split


```
// vite.config.ts
import { chunkSplitPlugin } from 'vite-plugin-chunk-split';

export default {
  chunkSplitPlugin({
    // 指定拆包策略
    customSplitting: {
      // 1. 支持填包名。`react` 和 `react-dom` 会被打包到一个名为`render-vendor`的 chunk 里面(包括它们的依赖，如 object-assign)
      'react-vendor': ['react', 'react-dom'],
      // 2. 支持填正则表达式。src 中 components 和 utils 下的所有文件被会被打包为`component-util`的 chunk 中
      'components-util': [/src\/components/, /src\/utils/]
    }
  })
}


```

* 拆包技术所解决的问题，主要包括无法按需加载以及线上缓存命中率低。
* Rollup 底层的拆包 API——manualChunks，用对象配置和函数配置两种方式来自定义拆包策略，对象配置使用上比较简单，但函数配置更加灵活。随后我和你分析了函数配置中容易遇到的坑——chunk 循环依赖问题，并分享了我的解决思路和方案。
* 不过一般情况下，大家将manualChunks配置为一个对象即可。


# 语法降级与Polyfill: 联合前端编译工具链 消灭低版本浏览器兼容问题

* 箭头函数  -> function(){}
* Polyfill本身可以翻译为 垫片,也就是为浏览器提前注入一些API的实现代码, 例如 Object.entries


* 编译时工具。代表工具有@babel/preset-env和@babel/plugin-transform-runtime。

* 运行时基础库。代表库包括core-js和regenerator-runtime。


* useBuiltIns: usage


```
// .babelrc.json
{
  "presets": [
    [
      "@babel/preset-env", 
      {
        // 指定兼容的浏览器版本
        "targets": {
          "ie": "11"
        },
        // 基础库 core-js 的版本，一般指定为最新的大版本
        "corejs": 3,
        // Polyfill 注入策略，后文详细介绍
        "useBuiltIns": "usage",
        // 不将 ES 模块语法转换为其他模块语法
        "modules": false
      }
    ]
  ]
}


```

* 需要提前说明的是，transform-runtime方案可以作为@babel/preset-env中useBuiltIns配置的替代品，也就是说，一旦使用transform-runtime方案，你应该把useBuiltIns属性设为 false。


```
// @babel/plugin-transform-runtime
{
  "plugins": [
    // 添加 transform-runtime 插件
    [
      "@babel/plugin-transform-runtime", 
      {
        "corejs": 3
      }
    ]
  ],
  "presets": [
    [
      "@babel/preset-env", 
      {
        "targets": {
          "ie": "11"
        },
        "corejs": 3,
        // 关闭 @babel/preset-env 默认的 Polyfill 注入
        "useBuiltIns": false,
        "modules": false
      }
    ]
  ]
}


```

# Vite 语法降级与 Polyfill 注入
* @vitejs/plugin-legacy


* 通过官方的legacy插件， Vite 会分别打包出Modern模式和Legacy模式的产物，然后将两种产物插入同一个 HTML 里面，Modern产物被放到 type="module"的 script 标签中，而Legacy产物则被放到带有 nomodule 的 script 标签中。浏览器的加载策略如下图所示:

* ![现在浏览器加载与低版本浏览器加载](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c2e76cdfdb1443a789d23439bd6aabce~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp)


# SSR
* SSR 中只能生成页面的内容和结构，并不能完成事件绑定，因此需要在浏览器中执行 CSR 的 JS 脚本，完成事件绑定，让页面拥有交互的能力，这个过程被称作`hydrate`(翻译为注水或者激活)。
* 同时，像这样服务端渲染 + 客户端 hydrate 的应用也被称为同构应用。


* 首先需要确保前端的代码经过编译后放到服务端中能够正常执行,其次在服务端渲染前端组件,生成并组装应用的HTML。
* 这就涉及到SSR应用的 两大生命周期  构建时   运行时


## 构建时
1. 解决模块加载问题。在原有的构建过程之外,需要加入SSR构建的过程,具体来说,我们需要另外生成一份CommonJS格式产物,使之能在Nodejs正常加载。  随着Nodejs本身对ESM的支持越来越成熟,我们也可以复用前端ESM格式的代码,Vite在开发阶段进行SSR构建思路

* ![Vite-SSR构建](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5a6c6311afab4279bdb2e39e1a6094d5~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp)
2. 移除样式代码的引入。 直接引入一行 css在服务端其实是无法执行的,因为 Nodejs并不能解析CSS的内容。 但是 CSS Module的情况除外。

```
import styles from './index.module.css'

// 这里的 styles 是一个对象，如{ "container": "xxx" }，而不是 CSS 代码
console.log(styles)


```
3. 依赖外部化(external) 对于某些第三方依赖我们并不需要使用构建后的版本,而是直接从 node_modules中读取,比如 react-dom,这样在SSR构建的过程中将不会构建这些依赖,从而极大程度加速SSR的构建。

## 运行时
*  SSR 的运行时，一般可以拆分为比较固定的生命周期阶段。
1. 加载SSR入口模块。在这个阶段我们需要确定SSR构建产物的入口,即组件的入口在哪里,并加载对应的模块
2. 进行数据预取。 这时候Node侧会通过查询数据库或者网络请求来获取应用所需的数据。
3. 渲染组件   这个阶段为SSR的核心 主要讲 第一步 中加载的组件渲染成hmtl字符串或者 Stream流。
4. html拼接  在组件渲染完成之后,我们需要拼接完整的html字符串 并将其作为响应式返回给浏览器。


# 基于 Vite 搭建 SSR 项目

* asynData try catch  就渲染 客户端页面 客户端渲染
* CDN(内容分发网络)后台开启读取源站 Cache-Control的支持   代码层面 可根据情况设置 Cache-Control  及不需要缓存的页面

* CDN(内容分发网络)后台开启读取源站 Cache-Control的支持。主要目的是:
1. 缓存控制  
  - 缓存策略一致性 通过读取源站的 Cache-Control 头部，CDN 可以确保其缓存行为与源站的意图保持一致。例如，如果源站设置了 Cache-Control: max-age=3600，CDN 会缓存该资源一小时
  - 避免缓存污染：正确处理 Cache-Control 可以防止过期或不必要的内容被缓存，从而提高缓存的有效性和资源的利用率。
2. 性能优化
  - 减少回源请求：当 CDN 节点接收到客户端请求时，如果本地缓存中有有效的内容（基于 Cache-Control 头部判断），则可以直接从缓存中提供响应，而不需要回源到原始服务器，从而显著减少延迟和带宽消耗。
  - 提高响应速度：有效的缓存策略可以加快页面加载速度和用户体验，尤其是在用户地理位置分散的情况下。

3. 版本管理
  - 资源更新机制：通过设置适当的 Cache-Control 值（如 no-cache 或 no-store），开发者可以在资源更新时强制客户端获取最新版本，而不是使用过时的缓存内容。
4. 安全性
  - 敏感数据保护：对于包含敏感信息的资源，可以使用 Cache-Control: no-cache, no-store, must-revalidate 来确保这些资源不会被缓存，以防止数据泄露。  



# 性能优化: 如何体系化地对Vite项目进行性能优化

* 对于项目的加载性能优化而言的,常规手段
1. 网络优化   HTTP2 DNS预解析  Preload Prefetch等手段   dns-prefetch
2. 资源优化  构建产物分析  资源压缩 产物拆包  按需加载
3. 预渲染优化  SSR

产生队头阻塞的原因:
* 单线程处理：在一个TCP连接上，虽然可以发送多个请求，但服务器通常是按顺序处理这些请求的。如果某个请求的处理时间较长，后续的请求就必须等待，这就形成了队头阻塞。
* 传输层限制：TCP协议本身是面向流的协议，它不区分不同的HTTP请求和响应。因此，在TCP层面上，数据是按顺序传输的。如果前面的请求数据还没有完全发送完毕，后面的请求数据就无法开始传输。
* 带宽竞争：在同一个TCP连接上，多个请求共享带宽。如果某个请求的数据量很大，它会占用更多的带宽，导致其他请求的传输速度变慢。


* 传统的HTTP1.1存在队头阻塞的问题,同一个TCP管道中同时刻只能处理一个http请求,也就是说如果当前请求没有处理完,其他的请求都处于阻塞状态,另外浏览器对于同一域名下的并发数量都有限制。 Chrome  只允许 6个请求并发。 其他只能排队。