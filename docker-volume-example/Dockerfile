FROM node:20

WORKDIR /app

# destination 경로인 '.'은 위에서 working directory를 '/app'으로 설정했으므로 '/app'을 지칭함
COPY package.json .

RUN npm install

COPY . .

# 시간이 오래 걸리는 layer와 관련 없는 작업이라면 layer 리빌드를 피하기 위해 Dockerfile의 아래쪽으로 순서를 옮겨줄 것
ARG DEFAULT_PORT=80

ENV PORT $DEFAULT_PORT

EXPOSE $PORT

# - container 외부 디렉토리에 매핑될 container 내부 위치
#   - Dockerfile 명령으로 생성할 수 있는 것은 anonymous volume 뿐임
# VOLUME [ "/app/feedback" ]
# - anonymous volume을 이용하여 bind mount 시 외부 경로의 내용이 내부 경로에 덮어씌워지는 문제 해결 가능
# VOLUME [ "/app/node_modules" ]

# nodemon을 적용해서 시작하기 위해 변경
# CMD [ "node", "server.js" ]
CMD [ "npm", "start" ]
# cf. ARG는 build-time에 사용되므로, CMD에서는 ARG에서 정의된 key을 사용할 수 없음
