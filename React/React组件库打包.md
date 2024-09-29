* lib  commonjs
* es   esmoudle
* dist umd

```
{
    "main":"lib/index.js",       require
    "module":"es/index.js",      import
    "unpkg":"dist/antd.min.js",  script
    "typeings":"es/index.d.ts"
}

```

* umd 的代码用 webpack打包就行
* esm  commonjs的不用打包, 只需要用 tsc 或者 babel编译下就好了。


* tsc(TypeScript编译器) 可以将 TS(.ts) 或JSX(.tsx) 代码编译成ESM格式。 可以通过配置 tsconfig.json文件来实现这一点。

```
tsconfig.json

{
  "compilerOptions": {
    "target": "esnext", // 指定目标 ECMAScript 版本
    "module": "esnext", // 指定模块系统为 ESM
    "moduleResolution": "node", // 使用 Node.js 的模块解析策略
    "jsx": "preserve", // 保留 JSX 语法，如果你需要编译成 React 可以设置为 'react' 或 'react-native'
    "esModuleInterop": true, // 允许使用 __importDefault 等便捷方式
    "allowSyntheticDefaultImports": true, // 允许合成默认导入
    "strict": true, // 启用所有严格类型检查选项
    "sourceMap": true, // 生成对应的 .map 文件
    "outDir": "./dist", // 指定输出目录
    "declaration": true, // 生成 .d.ts 声明文件
    "skipLibCheck": true, // 跳过库文件的类型检查
    "forceConsistentCasingInFileNames": true // 强制文件名一致性
  },
  "include": ["src"] // 指定要编译的源文件目录
}

```
* "target":"esnext" 表示编译的目标是最新版本的ECMAScript
* "module":"esnext" 表示使用最新的ECMAScript模块系统
* "jsx":"preserve" 表示保留JSX语法,如果你需要将其转换为 React可以设置为 react 或 react-dom

* 运行 tsc 命令时 TS编译器会根据这个配置文件将 .ts 或 .tsx文件编译成ESM格式


* gulp是用来组织编译任务的,可以让任务串行 并行的执行。
* gulp.series 串行执行任务 
* gulp.parallel 则是并行


* npx tsc -p tsconfig.build.json --module ESNext --outDir dist/esm
* npx tsc -p tsconfig.build.json --module commonjs --outDir dist/cjs


* npx sass ./src/Calendar/index.scss ./dist/esm/Calendar/index.css

* npx sass ./src/Calendar/index.scss ./dist/cjs/Calendar/index.css

* npx sass ./src/Message/index.scss ./dist/esm/Message/index.css

* npx sass ./src/Message/index.scss ./dist/cjs/Message/index.css



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
* files 是哪些文件发布到 npm 仓库，没列出来的会被过滤掉

* npm adduser
* npm publish


* 它和 dependencies 一样，都是依赖，但是 dependencies 是子级，而 peerDependencies 是平级。

* 如果和其他 react 包的版本冲突时，dependencies 会保留一份副本，而 peerDependencies 会提示开发者去解决冲突，不会保留副本。


* umd 格式  tsconfig.json   jsx -> react  在每个报错的组件加一下 React 全局变量：


* react 通过 externals或 react/jsx-runtime 引入有什么区别？ 
  - externals是一个webpack配置选项，用于指定不应该被webpack打包的依赖项，而是在运行时从环境中获取。这通常用于库的开发，以避免将React等库打包到最终的bundle中，因为这些库通常会被多个应用共享。
  - react/jsx-runtime是React 17及更高版本中的一个新特性，它是React的JSX转换的一部分。React引入了这个新的runtime来优化JSX的转换过程，使得JSX可以更高效地运行。