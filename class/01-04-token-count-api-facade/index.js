function checkValidationPhone(myphone) {
  if (myphone.length !== 10 && myphone.length !== 11) {
    console.log('에러! 핸드폰 번호를 제대로 입력해주세요.');
    return false;
  } else {
    return true;
  }
}

function getToken(mycount) {
  if (mycount === undefined) {
    console.log('에러! 갯수를 입력해주세요.');
    return;
  } else if (mycount <= 0) {
    console.log('에러! 갯수가 너무 적습니다.');
    return;
  } else if (mycount > 10) {
    console.log('에러! 갯수가 너무 많습니다.');
    return;
  }
  const result = String(Math.floor(Math.random() * 10 ** mycount)).padStart(mycount, '0');
  return result;
}

function sendTokenToSMS(myphone, result) {
  console.log(`${myphone} 번호로 인증번호 ${result}를 전송합니다.`);
}

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
