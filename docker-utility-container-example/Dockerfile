# utility container 구축에는 조금 더 슬림하고 최적화된 base image 사용
FROM node:20-alpine

# docker run 명령 시 전달되는 명령어도 이 경로에서 실행
WORKDIR /app

# CMD [ ... ] # image의 사용자에게 더 많은 권한을 부여하기 위해 명령어를 명시하지 않음
# ENTRYPOINT는 CMD와 유사하지만, docker run 실행 시 입력된 명령어가 ENTRYPOINT를 오버라이드 하지 않고, append 하는 방식으로 동작
ENTRYPOINT [ "npm" ]
