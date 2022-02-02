import { getCreatedAt } from './utils.js';
import axios from 'axios';

export const checkEmail = email => {
  if (!email) {
    return false;
  } else if (!email.includes('@')) {
    return false;
  }
  return true;
};

export const getTemplate = ({ name, prefer, phone }) => {
  const createdAt = getCreatedAt();
  return `
    <html>
      <body>
        <h1 style="color: lightblue">${name}님 가입을 환영합니다!!!</h1>
        <hr />
        <div>이름: ${name}</div>
        <div>전화번호: ${phone}</div>
        <div>좋아하는 사이트: ${prefer}</div>
        <div>가입일: ${createdAt}</div>
      </body>
    </html>
  `;
};

export async function sendEmail(user, template) {
  const appKey = process.env.EMAIL_APP_KEY;
  const XSecretKey = process.env.EMAIL_X_SECRET_KEY;
  const sender = process.env.EMAIL_SENDER;

  const result = await axios.post(
    `https://api-mail.cloud.toast.com/email/v2.0/appKeys/${appKey}/sender/mail`,
    {
      senderAddress: sender,
      title: `${user.name}님. 가입을 환영합니다.`,
      body: template,
      receiverList: [
        {
          receiveMailAddr: user.email,
          receiveType: 'MRT0',
        },
      ],
    },
    {
      headers: {
        'X-Secret-Key': XSecretKey,
        'Content-Type': 'application/json;charset=UTF-8',
      },
    }
  );
}
