FROM node:18.0-alpine3.14 as build-stage

WORKDIR /app

COPY package.json .

RUN npm config set registry https://registry.npmmirror.com/

RUN npm install

COPY . .

RUN npm run build

# production stage
FROM node:18.0-alpine3.14 as production-stage

COPY --from=build-stage /app/dist /app
COPY --from=build-stage /app/package.json /app/package.json

WORKDIR /app

RUN npm config set registry https://registry.npmmirror.com/

RUN npm install --production

EXPOSE 3000

CMD ["node", "/app/main.js"]

# docker build -t nest:ccc .
# 在 Docker 的多阶段构建中，最终的产物通常是由最后一个阶段指定的
# 在 Docker 多阶段构建中，前面阶段的产物在构建过程中生成，但它们不会直接成为最终镜像的一部分，除非在后续阶段中被明确复制（COPY --from）过来。
# 前面阶段的产物主要用于中间步骤，例如编译代码、安装依赖等，其作用更多是为后续阶段提供所需的资源和准备工作环境。但如果没有被后续阶段引用，它们在最终构建的镜像中是不存在的