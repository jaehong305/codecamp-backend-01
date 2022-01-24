import express from 'express';
import mongoose from 'mongoose';
import { checkValidationPhone, getToken, sendTokenToSMS } from './phone.js';
import dotenv from 'dotenv';
import { Token } from './models/token.model.js';
dotenv.config();

const app = express();
app.use(express.json());

app.post('/tokens/phone', async function (req, res) {
  const phone = req.body.phone;
  if (checkValidationPhone(phone)) {
    // 2. 핸드폰 토큰 6자리 만들기
    const mytoken = getToken(4);
    const myphone = await Token.find({ phone });
    if (myphone.length) {
      await Token.updateOne({ phone }, { token: mytoken });
      return;
    }

    const token = new Token({
      token: mytoken,
      phone,
      isAuth: false,
    });
    await token.save();

    // 3. 핸드폰번호에 토큰 전송하기
    sendTokenToSMS(phone, mytoken);
    res.send('토큰이 전송되었습니다.');
  } else {
    return;
  }
});

app.patch('/tokens/phone', async function (req, res) {
  const phone = req.body.phone;
  const token = req.body.token;
  const myphone = await Token.find({ phone });
  if (!myphone.length) {
    res.send('인증번호 요청을 먼저 해주세요.');
    return;
  }
  if (myphone[0].token !== token) {
    res.send('인증번호가 틀렸습니다.');
    return;
  }
  if (myphone[0].token === token) {
    await Token.updateOne({ phone }, { isAuth: true });
    // myphone[0].isAuth = true;
    // await myphone.save();
    res.send('인증완료');
  }
});

mongoose.connect('mongodb://my_database:27017/codecamp');

app.listen(3000);
