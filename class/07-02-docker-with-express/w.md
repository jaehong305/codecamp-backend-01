docker exec -it 컨테이너아이디 /bin/bash : 도커 컴퓨터 터미널 실행  
top : 실행중 프로세스 목록

docker에서 실행한 서버는 포트포워딩 해줘야한다

- ex) docker run -p 3000:3001 이미지아이디 :
  3000번 포트로 들어온 요청을 도커로 30001번 포트로 포워딩