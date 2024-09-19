# Webpack编译流程
1. 输入:从文件系统读入代码文件
2. 模块递归处理:调用Loader转译Module内容,并将结果转换为AST,从中分析出模块依赖关系,进一步递归调用模块处理过程,直到所有依赖文件都处理完毕
3. 后处理: 所有模块递归处理完毕后开始执行后处理,包括模块合并 注入运行时 产物优化等,最终输出Chunk 集合。
4. 输出: 将Chunk写出到外部文件系统。

* 流程类配置项综述
* 工具类配置项综述


# Webpack5 中的持久化缓存
* 持久化缓存 它能够将首次构建的过程域结果数据持久化保存到本地文件系统,在下次执行构建时跳过解析 链接 编译等一系列非常消耗性能的操作,直接复用上次的 Module/ModuleGraph/Chunk 对象数据，迅速构建出最终产物。
* cache.type = 'filesystem'


* 使用组建自带的缓存功能
    - babel-loader  cacheDirectory: true

# Webpack并行构建的方法
* HappyPack

# 构建性能极致优化技巧
1. 最新版本webpack
2. 约束Loader执行范围 exclude: /node_modules/
3. 使用 noParse跳过文件编译  noParse: /lodash|react/
4. 开发模式禁用产物优化  mode='development' 
5. 最小化 watch监控范围
6. 跳过TS类型检查  ts-loader   transpileOnly: true   // fork 出子进程，专门用于执行类型检查new ForkTsCheckerWebpackPlugin()
7. 使用新版本组件 eslint-webpack-plugin 替代旧版 eslint-loader，两者差异在于，eslint-webpack-plugin 在模块构建完毕（compilation.hooks.succeedModule 钩子）后执行检查，不会阻断文件加载流程，性能更优，用法
8. 开发环境使用 eval ，确保最佳编译速度；生产环境使用 source-map，获取最高质量。
9. 设置 resolve 缩小搜索范围

# 正确使用SplitChunks提升应用性能