* docker组成
    - client 
        - docker pull  
        - docker build
        - docker run
    - docker_host docker daemon   Images Containers
    - Registry
        - Nginx 
        - Node     
* dockerfile 在 docker 守护进程 docker daemon 进行 build。  命令行工具会和 docker daemon 交互来实现各种功能。
* docker build的时候 会把 dockerfile 和 它的构建上下文(也就是目录所在目录) 打包发送给 docker daemon 来构建镜像
* docker build -t name:tag -f filename .
* 这个 . 就是 构建上下文的目录 你也可以指定别的路径。
* .dockerignore  忽略某些文件,把剩余的文件打包发送给 docker daemon作为 上下文来构建产物镜像。  忽略这些用不到的文件,是为了让构建更快 镜像体积更小。

- FROM: 基于某个基础镜像来修改
- WORKDIR: 指定当前工作目录
- COPY: 把容器外的内容复制到容器内
- EXPOSE: 申明当前容器要访问的网络端口
- RUN: 在容器内执行命令
- CMD: 在容器启动的时候执行的命令

* 通过WORKDIR指定当前目录
* 然后通过COPY把Dockerfile同级目录下的内容复制到容器内，这里的 . 也就是 /app
* RUN 执行 npm install 全局安装 http-server
* 通过 EXPOSE 指定要暴露的端口
* CMD指定容器跑起来之后的命令