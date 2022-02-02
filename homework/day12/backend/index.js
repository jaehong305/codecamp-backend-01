import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerJSdoc from 'swagger-jsdoc';
import { options } from './swagger/config.js';
import { checkValidationPhone, getToken, sendTokenToSMS } from './phone.js';
import { Token } from './models/token.model.js';
import { Starbucks } from './models/starbucks.model.js';
import { UserController } from './controllers/user.controller.js';

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

const userController = new UserController();
app.post('/users', userController.postUsers);
app.get('/users', userController.getUsers);

app.get('/starbucks', async function (req, res) {
  const menu = await Starbucks.find();
  res.send(menu);
});

mongoose.connect('mongodb://my_database:27017/codecamp');

app.listen(3000);
