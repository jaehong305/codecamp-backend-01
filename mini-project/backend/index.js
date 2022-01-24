import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerJSdoc from 'swagger-jsdoc';
import { options } from './swagger/config.js';
import { checkValidationPhone, getToken, sendTokenToSMS } from './phone.js';
import { checkEmail, getTemplate, sendEmail } from './email.js';
import { Token } from './models/token.model.js';
import { User } from './models/user.model.js';
import { getOpenGraph } from './cheerio.js';
import { Starbucks } from './models/starbucks.model.js';

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJSdoc(options)));

app.post('/tokens/phone', async function (req, res) {
  const phone = req.body.phone;
  if (checkValidationPhone(phone)) {
    // 토큰 생성후 문자 보내기
    const mytoken = getToken(4);
    sendTokenToSMS(phone, mytoken);

    // 이미 있는 번호면 토큰 업데이트
    const myphone = await Token.findOne({ phone });
    if (myphone) {
      await Token.updateMany({ phone }, { token: mytoken, isAuth: false });
      res.send(true);
      return;
    }

    // 없으면 번호와 토큰 디비에 저장
    await new Token({
      token: mytoken,
      phone,
      isAuth: false,
    }).save();
    res.send(true);
  } else {
    res.send(false);
  }
});

app.patch('/tokens/phone', async function (req, res) {
  const phone = req.body.phone;
  const token = req.body.token;
  // 토큰 인증
  const myphone = await Token.findOne({ phone });
  if (!myphone || myphone.token !== token) {
    res.send(false);
    return;
  }
  if (myphone.token === token) {
    await Token.updateOne({ phone }, { isAuth: true });
    res.send(true);
  }
});

app.post('/users', async function (req, res) {
  const user = req.body.user;
  const { name, email, personal1, personal2, prefer, pwd, phone } = user;
  if (!name || !personal1 || !personal2 || !phone || !prefer || !pwd) {
    res.send('회원정보를 모두 입력해주세요.');
    return;
  }

  // 번호 인증완료 체크
  const myphone = await Token.findOne({ phone });
  if (!myphone || !myphone.isAuth) {
    res.status(422).send('에러!! 핸드폰 번호가 인증되지 않았습니다.');
    return;
  }

  // 1. email이 정상인지 확인(1-존재여부, 2-@포함여부)
  if (checkEmail(email)) {
    const personal = `${personal1}-*******`;
    const og = await getOpenGraph(prefer);
    await new User({
      name,
      email,
      personal,
      prefer,
      pwd,
      phone,
      og: {
        title: og.title,
        description: og.description,
        image: og.image,
      },
    }).save();
    myphone.isAuth = false;
    await myphone.save();

    const me = await User.findOne({ phone });
    res.send(`회원가입이 완료되었습니다. ID${me._id}`);

    // 2. 가입환영 템플릿 만들기
    const template = getTemplate(user);

    // 3. 이메일에 가입환영 템플릿 전송하기(콘솔)
    sendEmail(user, template);
  } else {
    res.send('email형식이 올바르지 않습니다.');
    return;
  }
});

app.get('/users', async function (req, res) {
  const users = await User.find();
  res.send(users);
});

app.get('/starbucks', async function (req, res) {
  const menu = await Starbucks.find();
  res.send(menu);
});

mongoose.connect('mongodb://my_database:27017/codecamp');

app.listen(3000);
