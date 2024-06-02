FROM composer:latest

RUN addgroup -g 1000 laravel && adduser -G laravel -g laravel -s /bin/sh -D laravel
 
USER laravel

# 작업 경로를 code가 있을 경로로 설정
WORKDIR /var/www/html

# composer 실행 시 일부 종속성이 누락되어도 경고, 오류 없이 실행하도록 옵션 설정
ENTRYPOINT [ "composer", "--ignore-platform-reqs" ]
