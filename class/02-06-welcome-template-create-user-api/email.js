import { getCreatedAt } from './utils.js';

export const checkEmail = email => {
  if (!email) {
    console.log('email을 입력해주세요.');
    return false;
  }
  if (!email.includes('@')) {
    console.log('email의 형식이 올바르지 않습니다.');
    return false;
  }
  return true;
};

export const getTemplate = (name, age, school) => {
  const createdAt = getCreatedAt();
  return `
    <html>
      <body>
        <h1>${name}님 가입을 환영합니다!!!</h1>
        <hr />
        <div>이름: ${name}</div>
        <div>나이: ${age}살</div>
        <div>학교: ${school}</div>
        <div>가입일: ${createdAt}</div>
      </body>
    </html>
  `;
};

export const sendEmail = (email, template) => {
  console.log(`${email}로 전송 ${template}`);
};
