# 1. 프로젝트명

## 고양이 사료 판매 사이트

### 묘종별 추천 사료를 볼 수 있으며 회원가입 후 로그인하여 상품을 결제할 수 있습니다.

---

## 배포주소

https://cat.ljh305.shop/graphql

---

## 기술스택

JS, TS Node.js  
Nest.js TypeORM Mysql  
Docker

---

## ERD설계

![고양이사이트ERD](./image/%EA%B3%A0%EC%96%91%EC%9D%B4%EC%82%AC%EC%9D%B4%ED%8A%B8.png)

## 파이프라인

![파이프라인](./image/%EB%AC%B4%EC%A0%9C.png)

---

## API설계

1. 회원가입
2. 로그인
3. 상품등록(이미지등록)
4. 결제(iamport)

---

## 프로젝트 설치방법 & 실행방법

1. git clone 후 docker-compose build / docker-compose up
2. localhost:3000/graphql 에서 테스트

---

## 폴더구조

📦main-project
┣ 📂backend
┃ ┣ 📂elk
┃ ┃ ┣ 📂elasticsearch
┃ ┃ ┣ 📂kibana
┃ ┃ ┗ 📂logstash
┃ ┃ ┃ ┣ 📜logstash.conf
┃ ┃ ┃ ┗ 📜mysql-connector-java-8.0.28.jar
┃ ┣ 📂functions
┃ ┃ ┗ 📜generateTumbnail.js
┃ ┣ 📂src
┃ ┃ ┣ 📂apis
┃ ┃ ┃ ┣ 📂auth
┃ ┃ ┃ ┃ ┣ 📜auth.controller.ts
┃ ┃ ┃ ┃ ┣ 📜auth.module.ts
┃ ┃ ┃ ┃ ┣ 📜auth.resolver.ts
┃ ┃ ┃ ┃ ┗ 📜auth.service.ts
┃ ┃ ┃ ┣ 📂cat
┃ ┃ ┃ ┃ ┣ 📂dto
┃ ┃ ┃ ┃ ┃ ┗ 📜createCat.input.ts
┃ ┃ ┃ ┃ ┗ 📂entities
┃ ┃ ┃ ┃ ┃ ┗ 📜cat.entity.ts
┃ ┃ ┃ ┣ 📂catDetail
┃ ┃ ┃ ┃ ┣ 📂dto
┃ ┃ ┃ ┃ ┃ ┗ 📜createCatDetail.input.ts
┃ ┃ ┃ ┃ ┗ 📂entities
┃ ┃ ┃ ┃ ┃ ┗ 📜catDetail.entity.ts
┃ ┃ ┃ ┣ 📂file
┃ ┃ ┃ ┃ ┣ 📜file.module.ts
┃ ┃ ┃ ┃ ┣ 📜file.resolver.ts
┃ ┃ ┃ ┃ ┗ 📜filte.service.ts
┃ ┃ ┃ ┣ 📂iamport
┃ ┃ ┃ ┃ ┗ 📜iamport.service.ts
┃ ┃ ┃ ┣ 📂mainCategory
┃ ┃ ┃ ┃ ┣ 📂entities
┃ ┃ ┃ ┃ ┃ ┗ 📜mainCategory.entity.ts
┃ ┃ ┃ ┃ ┣ 📜mainCategory.module.ts
┃ ┃ ┃ ┃ ┣ 📜mainCategory.resolver.ts
┃ ┃ ┃ ┃ ┗ 📜mainCategory.service.ts
┃ ┃ ┃ ┣ 📂order
┃ ┃ ┃ ┃ ┣ 📂dto
┃ ┃ ┃ ┃ ┃ ┗ 📜createOrder.Input.ts
┃ ┃ ┃ ┃ ┣ 📂entities
┃ ┃ ┃ ┃ ┃ ┗ 📜order.entity.ts
┃ ┃ ┃ ┃ ┣ 📜order.module.ts
┃ ┃ ┃ ┃ ┣ 📜order.resolver.ts
┃ ┃ ┃ ┃ ┗ 📜order.service.ts
┃ ┃ ┃ ┣ 📂payment
┃ ┃ ┃ ┃ ┣ 📂entities
┃ ┃ ┃ ┃ ┃ ┗ 📜payment.entity.ts
┃ ┃ ┃ ┃ ┣ 📜payment.module.ts
┃ ┃ ┃ ┃ ┣ 📜payment.resolver.ts
┃ ┃ ┃ ┃ ┗ 📜payment.service.ts
┃ ┃ ┃ ┣ 📂product
┃ ┃ ┃ ┃ ┣ 📂dto
┃ ┃ ┃ ┃ ┃ ┣ 📜createProduct.input.ts
┃ ┃ ┃ ┃ ┃ ┗ 📜updateProduct.input.ts
┃ ┃ ┃ ┃ ┣ 📂entities
┃ ┃ ┃ ┃ ┃ ┗ 📜product.entity.ts
┃ ┃ ┃ ┃ ┣ 📜product.module.ts
┃ ┃ ┃ ┃ ┣ 📜product.resolver.ts
┃ ┃ ┃ ┃ ┗ 📜product.service.ts
┃ ┃ ┃ ┣ 📂productImage
┃ ┃ ┃ ┃ ┣ 📂dto
┃ ┃ ┃ ┃ ┃ ┗ 📜createProductImage.Input.ts
┃ ┃ ┃ ┃ ┣ 📂entities
┃ ┃ ┃ ┃ ┃ ┗ 📜product.image.entity.ts
┃ ┃ ┃ ┃ ┣ 📜product.image.module.ts
┃ ┃ ┃ ┃ ┣ 📜product.image.resolver.ts
┃ ┃ ┃ ┃ ┗ 📜product.image.service.ts
┃ ┃ ┃ ┣ 📂subCategory
┃ ┃ ┃ ┃ ┣ 📂entities
┃ ┃ ┃ ┃ ┃ ┗ 📜subCategory.entity.ts
┃ ┃ ┃ ┃ ┣ 📜subCategory.module.ts
┃ ┃ ┃ ┃ ┣ 📜subCategory.resolver.ts
┃ ┃ ┃ ┃ ┗ 📜subCategory.service.ts
┃ ┃ ┃ ┗ 📂user
┃ ┃ ┃ ┃ ┣ 📂dto
┃ ┃ ┃ ┃ ┃ ┣ 📜createUser.input.ts
┃ ┃ ┃ ┃ ┃ ┗ 📜updateUser.input.ts
┃ ┃ ┃ ┃ ┣ 📂entities
┃ ┃ ┃ ┃ ┃ ┗ 📜user.entity.ts
┃ ┃ ┃ ┃ ┣ 📜user.module.ts
┃ ┃ ┃ ┃ ┣ 📜user.resolver.ts
┃ ┃ ┃ ┃ ┗ 📜user.service.ts
┃ ┃ ┣ 📂common
┃ ┃ ┃ ┣ 📂auth
┃ ┃ ┃ ┃ ┣ 📜gql-auth.guard.ts
┃ ┃ ┃ ┃ ┣ 📜gql-user.param.ts
┃ ┃ ┃ ┃ ┣ 📜jwt-access.strategy.ts
┃ ┃ ┃ ┃ ┣ 📜jwt-refresh.strategy.ts
┃ ┃ ┃ ┃ ┣ 📜jwt-social-google.strategy.ts
┃ ┃ ┃ ┃ ┣ 📜jwt-social-kakao.strategy.ts
┃ ┃ ┃ ┃ ┗ 📜jwt-social-naver.strategy.ts
┃ ┃ ┃ ┣ 📂filter
┃ ┃ ┃ ┃ ┗ 📜http-exception.filter.ts
┃ ┃ ┃ ┣ 📂graphql
┃ ┃ ┃ ┃ ┗ 📜schema.gql
┃ ┃ ┃ ┗ 📂libraries
┃ ┃ ┃ ┃ ┗ 📜utils.ts
┃ ┃ ┣ 📜.DS_Store
┃ ┃ ┣ 📜app.module.ts
┃ ┃ ┗ 📜main.ts
┃ ┣ 📂test
┃ ┃ ┣ 📜app.e2e-spec.ts
┃ ┃ ┗ 📜jest-e2e.json
┃ ┣ 📜.DS_Store
┃ ┣ 📜.dockerignore
┃ ┣ 📜.env
┃ ┣ 📜.eslintrc.js
┃ ┣ 📜.gitignore
┃ ┣ 📜.prettierrc
┃ ┣ 📜Dockerfile
┃ ┣ 📜README.md
┃ ┣ 📜codecamp-341008-f2e13af58904.json
┃ ┣ 📜docker-compose.dev.yaml
┃ ┣ 📜docker-compose.prod.yaml
┃ ┣ 📜docker-compose.stage.yaml
┃ ┣ 📜docker-compose.yaml
┃ ┣ 📜nest-cli.json
┃ ┣ 📜package.json
┃ ┣ 📜tsconfig.build.json
┃ ┣ 📜tsconfig.json
┃ ┣ 📜yarn-error.log
┃ ┗ 📜yarn.lock
┣ 📂frontend
┃ ┣ 📂img
┃ ┃ ┣ 📜back-ground.jpg
┃ ┃ ┣ 📜facebook.png
┃ ┃ ┣ 📜google.png
┃ ┃ ┣ 📜kakao.png
┃ ┃ ┣ 📜menu-back-ground.jpg
┃ ┃ ┣ 📜naver.png
┃ ┃ ┣ 📜starbucks.png
┃ ┃ ┗ 📜user-back-ground.jpg
┃ ┣ 📂login
┃ ┃ ┣ 📜index.css
┃ ┃ ┗ 📜index.html
┃ ┗ 📜payment.html
┣ 📂image
┃ ┣ 📜무제.png
┃ ┗ 📜고양이사이트.png
┗ 📜README.md

---

## .env 설정

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

KAKAO_CLIENT_ID=
KAKAO_CLIENT_SECRET=

NAVER_CLIENT_ID=
NAVER_CLIENT_SECRET=

IMPORT_KEY=
IMPORT_SECRET=

GCP_STORAGE_FILENAME=
GCP_STORAGE_PROJECTID=
GCP_STORAGE_BUCKET=
