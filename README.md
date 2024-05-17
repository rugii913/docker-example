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
