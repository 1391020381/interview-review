# Docker 方式 部署 vue 项目 （docker + vue + nginx）
# https://cloud.tencent.com/developer/article/1979969
# jenkins 上  npm install --production  npm run build  生成 dist目录

FROM nginx
# 将 dist 文件中的内容 复制到 /usr/share/nginx/html/
COPY dist/  /usr/share/nginx/html/

# docker build -t  vue-app .
# docker images
# docker run -p 3000:80 -d --name vue-app  vue-app