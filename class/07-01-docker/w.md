docker build . : 이미지 패키징  
docker images : 이미지보기  
docker run 이미지아이디 : 컴퓨터실행  
docker ps : 도커 프로세스(도커 컨테이너 목록)
docker ps -a : 전체보여주기(꺼진 컨테이너(컴퓨터)포함)  
docker rm 컨테이너아이디 : 컨테이너 제거
docker rmi 이미지아이디 : 이미지 제거
docker stop 컨테이너아이디 : 실행 종료

node 버전 같게하기 위해 RUN yarn install까지 포장해준다.  
CMD는 포장에 포함이 아니고 실행 명령으로 한번만 쓸 수 있다.  
RUN yarn dev로 같이 포장하면 포장이 끝나지 않는다(익스프레스 리슨)
