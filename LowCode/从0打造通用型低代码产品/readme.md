* pnpm workspace组织代码,并抽离以下核心功能。
1. 利用HOC能力,抽取物料组件craftjs功能。
2. 利用 iframe沙盒提供动态执行js能力。
3. 使用sucrase 和 @monaco-editor/react提供在线代码编能力。
4. 使用zustand提供全局状态能力。
5. 结合 2、3、4、实现动态逻辑执行和组件事件联动。
5. 封装属性面板setter/fields方便业务开发更专注业务组件开发。
6. 业务组件库且区分编辑器环境与真实渲染环境。
7. NestJS TypeORM作为服务端，保存发布页面信息。