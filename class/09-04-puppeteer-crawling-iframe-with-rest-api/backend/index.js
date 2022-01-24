import expressD from 'express'; // export default: 디폴트설정값 불러오므로 변수이름 자유
import mongoose from 'mongoose';
// import * as aaa from './phone.js'; export 모두 불러오기 사용 => aaa.getToken()
import { checkValidationPhone, getToken, sendTokenToSMS } from './phone.js';
import { checkEmail, getTemplate, sendEmail } from './email.js';
import swaggerUi from 'swagger-ui-express';
import swaggerJSdoc from 'swagger-jsdoc';
import { options } from './swagger/config.js';
import dotenv from 'dotenv';
import { Board } from './models/board.model.js';
import { Stock } from './models/stock.model.js';
dotenv.config();

const app = expressD();
app.use(expressD.json()); // json 요청 연결시켜줌.
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJSdoc(options)));

app.get('/boards', async function (req, res) {
  // 데이터를 조회하는 로직 => DB에서 꺼내옴
  // res.send('조회에 성공하였습니다.');
  const result = await Board.find({ writer: '이재홍' });
  console.log(result);
  res.send([
    { number: 1, writer: '철수', title: '철수입니다.', contents: '철수의 내용입니다~' },
    { number: 2, writer: '영희', title: '영희입니다.', contents: '영희의 내용입니다~' },
    { number: 3, writer: '훈이', title: '훈이입니다.', contents: '훈이의 내용입니다~' },
  ]);
});

// 요청방식만 바꾸고 이름(엔드포인트)은 같게 : restful하다.
app.post('/boards', async function (req, res) {
  // 데이터를 등록하는 로직 => DB에다 저장함

  const board = new Board({
    writer: req.body.writer,
    title: req.body.title,
    contents: req.body.contents,
    // pretitle:
    // precontents:
    // preimage:
    // preurl:
  });
  await board.save();

  res.send('등록에 성공하였습니다.');
});

app.post('/tokens/phone', function (req, res) {
  if (checkValidationPhone(req.body.phone)) {
    // 2. 핸드폰 토큰 6자리 만들기
    const mytoken = getToken(4);

    // 3. 핸드폰번호에 토큰 전송하기
    sendTokenToSMS(req.body.phone, mytoken);
  } else {
    return;
  }
});

app.post('/users', function (req, res) {
  const user = req.body.user;
  // 1. email이 정상인지 확인(1-존재여부, 2-@포함여부)
  if (checkEmail(user.email)) {
    // 2. 가입환영 템플릿 만들기
    const template = getTemplate(user);

    // 3. 이메일에 가입환영 템플릿 전송하기(콘솔)
    sendEmail(user.email, template);
  }
});

app.get('/stocks', async function (req, res) {
  const stocks = await Stock.find();
  res.send(stocks);
});

// 몽고 DB에 접속
mongoose.connect('mongodb://my_database:27017/codecamp');
// 네임 리졸루션: my_database란 이름으로 실행되고 있는 도커컨테이너서비스를 도커컴포즈가 찾아준다.
// express 서버 오픈(리슨)
app.listen(3001);
