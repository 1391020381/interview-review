* [React 渲染流程可视化，有大佬实现了！](https://mp.weixin.qq.com/s/uxBRkFZS-RgGu_bUIstFBQ)
* vdom
* dsl的编译
* 渲染vdom
* 组件
* 状态管理
    - react是通过 setState的api触发状态更新的,更新以后就重新渲染整个vdom。
    - vue通过对状态做代理 get的时候收集依赖,然后修改状态就可以触发对应组件的 render。

* react架构的演变
    - react15的时候，和vue的渲染流程还是很像的,都是递归渲染vdom 增删改dom就行。
    - react的setState会渲染整个vdom 而一个应用的所有vdom可能是很庞大的,计算量就很大。时间长就会阻塞渲染的,会造成卡顿。
* fiber架构    
    - react把渲染流程分为 两部分 render commit
    - render阶段会找到vdom中变化的部分,创建dom,打上增删改的标记,这个叫做 reconcile 调和。
    - reconcile是可以打断的,由 schedule调度。
    - 之后全家计算完,就一次性更新到dom 叫做 commit。
    - 这样 react就把递归渲染，改造成 render(reconcile + schdule) + commit两个阶段的渲染。 
    - 现有的 vdom 是不行的，需要再记录下 parent、silbing 的信息。所以 react 创造了 fiber 的数据结构。
    - children 信息外，额外多了 sibling、return，分别记录着兄弟节点、父节点的信息 ,这个数据结构也叫做 fiber。 react 会先把 vdom 转换成 fiber，再去进行 reconcile  




# react组件库构建
* 组件库构建,就是构建出 esm  commonjs umd 3种格式的代码,再加上css的构建就好了。

```
// tsconfig.build.json


{
    "compilerOptions": {
      "declaration": true,
      "allowSyntheticDefaultImports": true,
      "target": "es2015",
      "lib": ["ES2020", "DOM", "DOM.Iterable"],
      "module": "ESNext",
      "skipLibCheck": true,
      "moduleResolution": "Node",
      "resolveJsonModule": true,
      "isolatedModules": true,
      "jsx": "react",  
      "allowImportingTsExtensions":null,
      "strict": true,
    },
    "include": [
      "src"
    ],
    "exclude": [
      "src/**/*.test.tsx",
      "src/**/*.stories.tsx"
    ]
}



```
* npx tsc -p tsconfig.build.json --module ESNext --outDir dist/esm

* npx sass ./src/Calendar/index.scss ./dist/esm/Calendar/index.css

```

"main": "dist/cjs/index.js",
"module": "dist/esm/index.js",
"types": "dist/esm/index.d.ts",
"files": [
    "dist",
    "package.json",
    "README.md"
],


```
* main 和 module 分别是 commonjs 和 es module 的入口。
* types 是 dts 的路径。
* files 是哪些文件发布到 npm 仓库，没列出来的会被过滤掉。
* 并且，还需要把 private: true 和 type: module 的字段给去掉。




# 构建部分我们分析过很多组件库，都是一样的：
* commonjs 和 esm 的代码通过 tsc 或者 babel 编译产生
* umd 代码通过 webpack 打包产生
* css 代码通过 sass 或者 less 等编译产生
* dts 类型也是通过 tsc 编译产生

* 这节我们实现了 umd 的支持，通过 webpack 做了打包。
* 打包逻辑很简单：用 ts-loader 来编译 typescript 代码，然后 react、react-dom 等模块用 externals 的方式引入就好了。
* 再就是 react 通过 externals 的方式，会导致 react/jsx-runtime 引入有问题，所以我们修改了 tsconfig.json 的 jsx 的编译为 react，也就是编译成 React.createElement 的代码。



# Vite打包

```
import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import styleImport from 'vite-plugin-style-import';

export default defineConfig({
  plugins: [
    reactRefresh(),
    styleImport({
      libs: [
        {
          libraryName: 'my-react-library',
          esModule: true,
          resolveStyle: (name) => {
            return `src/components/${name}/style.scss`; // 根据实际情况调整路径
          },
        },
      ],
    }),
  ],
  build: {
    lib: {
      entry: 'src/index.tsx',
      name: 'MyReactLibrary',
      fileName: (format) => `my-react-library.${format}.js`
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      }
    }
  }
});


```