* pnpm monorepo 搭建并抽离工具类和组件


* 是的，pnpm支持Monorepo（多库）结构，可以在同一仓库下管理多个相互关联的子项目（比如一个库项目和一个应用项目），并可以简单高效地处理这些子项目之间的依赖关系。


* pnpm-workspace.yaml
*     packages: ['packages/*'] // "packages"为存放所有子项目的目录，在该目录下每个子目录就是一个子项目

*     {
      "dependencies": {
        "utils": "workspace:*"
      }
    }


*  import { sayHello } from 'utils'

    sayHello()    