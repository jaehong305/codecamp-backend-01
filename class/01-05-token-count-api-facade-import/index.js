import { checkValidationPhone, getToken, sendTokenToSMS } from './phone.js';

// API 만들기
function createTokenOfPhone(myphone) {
  // 1. 휴대폰번호 자릿수 맞는지 확인
  const isValid = checkValidationPhone(myphone);
  if (isValid) {
    // 2. 핸드폰 토큰 6자리 만들기
    const mytoken = getToken(4);

    // 3. 핸드폰번호에 토큰 전송하기
    sendTokenToSMS(myphone, mytoken);
  } else {
    return;
  }
}

// API 실행하기
createTokenOfPhone('01012345678');
