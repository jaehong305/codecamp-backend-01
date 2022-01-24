import { getCreatedAt } from './utils.js';
import axios from 'axios';

export const checkEmail = email => {
  if (!email) {
    console.log('email을 입력해주세요.');
    return false;
  } else if (!email.includes('@')) {
    console.log('email의 형식이 올바르지 않습니다.');
    return false;
  }
  return true;
};

export const getTemplate = ({ name, age, school }) => {
  const createdAt = getCreatedAt();
  return `
    <html>
      <body>
        <h1 style="color: red">${name}님 가입을 환영합니다!!!</h1>
        <hr />
        <div>이름: ${name}</div>
        <div>나이: ${age}살</div>
        <div>학교: ${school}</div>
        <div>가입일: ${createdAt}</div>
      </body>
    </html>
  `;
};

export async function sendEmail(email, template) {
  const appKey = process.env.EMAIL_APP_KEY;
  const XSecretKey = process.env.EMAIL_X_SECRET_KEY;
  const sender = process.env.EMAIL_SENDER;

  const result = await axios.post(
    `https://api-mail.cloud.toast.com/email/v2.0/appKeys/${appKey}/sender/mail`,
    {
      senderAddress: sender,
      title: '[템플릿포함] 안녕하세요 철수님. 가입을 환영합니다.',
      body: template,
      receiverList: [
        {
          receiveMailAddr: email,
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
  console.log(result);
  // console.log(`${email}로 전송 ${template}`);
}
