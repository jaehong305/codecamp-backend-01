import express from 'express';
import { checkValidationPhone, getToken, sendTokenToSMS } from './phone.js';
import { checkEmail, getTemplate, sendEmail } from './email.js';
import swaggerUi from 'swagger-ui-express';
import swaggerJSdoc from 'swagger-jsdoc';
import { options } from './swagger/config.js';
import getMenu from './menu.js';
import getUser from './user.js';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJSdoc(options)));

app.get('/users', function (req, res) {
  getUser(res);
});

app.get('/starbucks', function (req, res) {
  getMenu(res);
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
    sendEmail(user, template);
  }
});

app.listen(3005);
