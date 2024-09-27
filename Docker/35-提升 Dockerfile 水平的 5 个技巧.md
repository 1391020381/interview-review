1. 使用 alpine 镜像 而不是默认的 linux镜像。
   - FROM node:18-alpine3.14
2. 多阶段构建

   - docker是分层存储的，dockerfile里的每一行指令是一层，会做缓存。每次docker build的时候，只会从变化的层卡扣式重新构建，没变的层直接复用。也就是说 先 copy package.json 然后 npm install 如果package.json没变，那么就不会执行 npm install,直接复用之前的。
   - 如果一开始把所有文件复制进去 不管package.json变没变，任何一个文件变了，都会重新npm install，这样没有充分利用缓存，性能不好。

   - 多阶段构建 build-stage

3. 使用ARG增加构建灵活性

```
FROM node:18-alpine3.14

ARG aaa
ARG bbb

WORKDIR /app

COPY ./test.js .

ENV aaa=${aaa} \
    bbb=${bbb}

CMD ["node", "/app/test.js"]



```

- 使用ARG声明构建参数 使用 ${xxx}来取
- 然后使用 ENV声明环境变量
- dockerfile内换行使用 \

- docker build --build-arg aaa=3 --build-arg bbb=4 -t arg-test -f 333.Dockerfile .
- ARG 是构建时的参数
- ENV 时 运行时的变量

4. CMD 结合 ENTRYPOINT

- 是否可以修改启动命令

5. COPY vs ADD
   - 两个都可以把目录下的文件复制到容器内的目录下
   - ADD 把 tar.gz 给解压然后复制到容器内了。
   - 一般情况 COPY使用居多
