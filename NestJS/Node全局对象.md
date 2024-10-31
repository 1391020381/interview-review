* global  -> window     
    - 在浏览器中我们定义的全局变量都在 window  nodejs在 global。
    - ECMAScript 2020  globalThis 全局变量  在nodejs环境会自动切换成 global,浏览器环境自动切换成 window.
* setTimeout setInterval Promise async await Match  console.log  Date

* nodejs内置全局API
    - __dirname  表示当前模块的所在 目录  的绝对路径
    - __filename 表示当前模块    文件  的绝对路径,包括文件名和文件拓展名。
    - require module   引入模块 和 模块导入
    - process  
        - process.argv
        - process.env
        - process.cwd()
        - process.on(event,listener)
            - process.on(exit,listener)
            - process.on(uncaughtException,listenter)
        - process.exit([code])
        - process.pid  属性返回当前进程的PID
    - Buffer
    -         