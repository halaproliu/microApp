FROM nginx:latest
# 定义作者
MAINTAINER "luffybryant@gmail.com"
# 将dist文件中的内容复制到 /usr/share/nginx/html/ 这个目录下面
COPY ./dist/ /usr/share/nginx/html/
# 用本地的 default.conf 配置来替换nginx镜像里的默认配置
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80