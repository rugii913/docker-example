# nginx config를 이용하기 위해 php-fpm image를 사용해야 함
FROM php:7.4-fpm-alpine

# 웹 사이트를 제공하는 웹 서버의 표준적인 디렉토리 중 하나 - 웹 app도 여기에 담을 것
WORKDIR /var/www/html

# 위 base image에 있는 도구 활용(부가 종속성 설치용) - php 확장 프로그램 pdo, pdo_mysql 설치
RUN docker-php-ext-install pdo pdo_mysql

# CMD 명령은 명시 x → 이 경우 base image에 CMD 명령이 있다면, default로 이를 실행
# 현재 base image인 php의 CMD 명령은 php interpreter를 호출하는 명령
