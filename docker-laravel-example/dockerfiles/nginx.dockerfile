FROM nginx:stable-alpine

WORKDIR /etc/nginx/conf.d

COPY nginx/nginx.conf .

# 파일 이름 변경
RUN mv nginx.conf default.conf

WORKDIR /var/www/html

COPY src .
