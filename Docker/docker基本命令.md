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