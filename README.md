# Docker, Kubernetes 예제

## 준비
### Docker 설치
- [docker docs 공식 문서](https://docs.docker.com/)
  - [Windows용 Docker Desktop 설치](https://docs.docker.com/desktop/install/windows-install/)
    - [Windows WSL 설치 방법](https://learn.microsoft.com/en-us/windows/wsl/install)
      - [Docker Desktop WSL 2 backend on Windows](https://docs.docker.com/desktop/wsl/)
    - [Windows Hyper-V 관련](https://docs.docker.com/desktop/troubleshoot/topics/#virtualization)
      - [Hyper-V 관련 설명](https://learn.microsoft.com/en-us/windows-server/virtualization/hyper-v/hyper-v-technology-overview)
    - [Windows에서 Docker 권한 문제 관련](https://docs.docker.com/desktop/windows/permission-requirements/)
- [WSL 2에서 Docker 원격 컨테이너 시작](https://learn.microsoft.com/ko-kr/windows/wsl/tutorials/wsl-containers)
- [WSL 2에 직접 Docker 설치하기\(네이버 블로그 참고\)](https://blog.naver.com/ilikebigmac/222007741507)
  - 굳이 이 블로그 글을 보기보다는 Docker 공식 문서 Install Docker Engine on Ubuntu 부분을 참고하면 될 듯

### VSCode 설정
- (확장) Docker, Prettier 등

### Docker 살펴보기
- [reference documentation](https://docs.docker.com/reference/)
  - [CLI reference](https://docs.docker.com/reference/cli/docker/)
  - [Develop with Docker Engine API](https://docs.docker.com/engine/api/)
- [Overview of Docker Desktop](https://docs.docker.com/desktop/)
  - Docker Desktop은 Docker Engine, Docker CLI client, Docker Scout, Docker Build, Docker Extensions, Docker Compose, Docker Content Trust, Kubernetes, Credential  Helper를 포함
  - Docker Engine은 애플리케이션을 빌드하고 컨테이너라이즈하는 컨테이너 기술
  - Docker Scout는 vulnerability에 대한 chain security 강화를 위한 것 [Docker Scout](https://docs.docker.com/scout/)
  - Docker Build는 image 만들기, 코드 패키징 등을 위한 것 [Overview of Docker Build](https://docs.docker.com/build/)
  - Docker Compose multi-container 애플리케이션을 정의하고 실행하기 위한 도구 [Docker Compose overview](https://docs.docker.com/compose/)
- [Docker Engine overview](https://docs.docker.com/engine/)
  - Docker Engine은 client-server 애플리케이션과 같이 동작함
    - dockerd가 daemon process인 server 역할
    - 프로그램들이 daemon과 소통할 수 있는 인터페이스인 APIs
    - docker는 CLI client 역할
      - CLI가 daemon과 상호작용하기 위해 스크립트 혹은 CLI 직접 명령을 통해 Docker APIs를 이용
  - Docker daemon 관련 참고
    - [Windows의 Docker 엔진](https://learn.microsoft.com/ko-kr/virtualization/windowscontainers/manage-docker/configure-docker-daemon)
    - [Start the daemon](https://docs.docker.com/config/daemon/start/)
    - Windows에서는 dockerd 명령어를 통해 Docker daemon을 실행할 수 없는 것으로 알고 있음
    - 하지만 C:\ProgramData\Docker\config\daemon.json 파일을 이용해 Docker daemon 구성을 변경할 수는 있음
  - [Install Docker Engine](https://docs.docker.com/engine/install/) Linex에서 Docker를 사용하고자 한다면 Docker Engine을 설치
    - [Install Docker Engine on Ubuntu](https://docs.docker.com/engine/install/ubuntu/)

## 핵심 정리
### Image & Container
#### Image
- 애플리케이션 코드와 이를 실행하는 데 필요한 도구, 설정 포함
- container의 템플릿, 청사진
- layer based architecture
   - Dockerfile의 모든 명령이 image context의 각 layer를 나타냄
  - image 빌드 시 Docker는 모든 명령 결과을 cache, 다시 실행할 필요가 없는 것으로 판단된 명령은 cache된 결과를 사용
  - 변경이 있을 경우 모든 후속 layer에 대해서 캐시 결과를 사용하지 않음
- read-only
  - 명령이 실행되고 image가 빌드되면 image의 code를 변경할 수 없음
  - 변경이 필요하면 새로운 image 빌드
#### Container
- 소프트웨어 실행 단위 - 애플리케이션과 실행 환경을 포함하는 작은 패키지
- image의 구체적인 실행 인스턴스
- container 실행 시 image layer 위에 새로운 container layer를 추가
#### Dockerfile
- 자체 이미지를 빌드할 때 실행하려는 명령이 있는 파일
- Dockerfile 작성
  - image 빌드 시 cache를 사용하도록 명령 순서 최적화 필요
  - \(1\) base image 지정
    - FROM [image 이름] → ex .FROM node
    - 보통 Docker 파일 첫 줄이 됨
    - 다른 base image 위에 커스텀 이미지를 구축 ex. OS layer , runtime 환경 같은 것들
    - 로컬 시스템에 있는 image 혹은 Docker Hub 등 registry에 있는 image 이름을 명시
  - \(2\) 작업 경로 지정
    - WORKDIR \[path\] → ex. WORKDIR /app
    - 모든 후속 명령도 해당 경로에서 실행
  - \(3\) 로컬 머신에 있는 파일 복사
    - COPY \[image의 외부 path\] \[path2\] → ex. COPY . ./
      - 첫번째 . → Dockerfile이 위치한 현재 경로를 기준으로 모든 디렉토리, 파일(하위 디렉토리, 파일 포함)을 복사, Dockerfile 자체는 포함하지 않음
      - 두번째 ./
        - 복사한 파일을 저장할 image 내부의 경로, image 및 container는 기본적으로 로컬 머신의 파일 시스템과 완전히 분리된 container 내부 파일 시스템을 가짐
        - ./ 으로 작성하면 WORKDIR로 지정된 경로에 복사, /app으로 명시적으로 작성할 수도 있음
    - image 빌드 시 cache 사용을 위해 일부 파일만 먼저 COPY 하도록 최적화 가능 → ex. COPY package.json /app
  - \(4\) 애플리케이션 빌드, 패키지 설정 등 작업을 위한 image 생성 시 필요 명령 작성
    - RUN \[명령어\]
      - ex. RUN npm install - cf. 시간이 오래 걸리는 작업은 Dockerfile 명령어 순서를 조정하여 cache를 사용할 수 있도록 최적화 필요
  - \(5\) 로컬 시스템과 통신할 포트 설정
    - EXPOSE [포트 번호 숫자] → ex. EXPOSE 80
    - CMD 명령보다 앞에 있어야 함
    - **EXPOSE 유의사항**
      - [Dockerfile reference- EXPOSE](https://docs.docker.com/reference/dockerfile/#expose)
      - EXPOSE: Describe which ports your application is listening on.
      - The EXPOSE instruction doesn't actually publish the port. ... Regardless of the EXPOSE settings, you can override them at runtime by using the -p flag.
      - EXPOSE는 문서화할 뿐임,  실제 포트 노출은 docker run -p 옵션을 통해 진행됨
  - \(6\) image를 바탕으로 container 시작 시 필요 명령 작성
    - CMD \[명령어를 위한 문자열 배열\] → ex. CMD \["node", "server.js"\]
    - CMD가 없는 경우 단지 base image가 실행됨
- Dockerfile 기반으로 커스텀 image 생성
  - docker build [Dockerfile이 있는 경로] → ex. docker build .
- 빌드된 커스텀 image를 container로 실행
  - docker run -p \[로컬 포트\]:\[container 노출 포트\] \[image 이름\]
    - container 노출 포트는 image에서 EXPOSE로 노출한 포트
    - cf. -p는 publish(게시)를 의미
