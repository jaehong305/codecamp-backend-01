// 휴대폰 인증 토큰 전송하기
const getValidationNumber = async () => {
  document.querySelector('#ValidationInputWrapper').style.display = 'flex';
  const phone1 = document.querySelector('#PhoneNumber02').value;
  const phone2 = document.querySelector('#PhoneNumber03').value;
  const phone = `010${phone1}${phone2}`;
  const result = await axios.post('http://localhost:3000/tokens/phone', { phone });
  if (result.data) {
    alert('인증번호가 전송되었습니다.');
  } else {
    alert('핸드폰 번호를 확인해주세요.');
  }
};

// 핸드폰 인증 완료 API 요청
const submitToken = async () => {
  const phone1 = document.querySelector('#PhoneNumber02').value;
  const phone2 = document.querySelector('#PhoneNumber03').value;
  const phone = `010${phone1}${phone2}`;
  const token = document.querySelector('#TokenInput').value;
  const result = await axios.patch('http://localhost:3000/tokens/phone', { phone, token });
  if (result.data) {
    alert('인증이 완료되었습니다.');
  } else {
    alert('인증번호를 확인해주세요');
  }
};

// 회원 가입 API 요청
const submitSignup = async () => {
  const name = document.querySelector('#SignupName').value;
  const email = document.querySelector('#SignupEmail').value;
  const personal1 = document.querySelector('#SignupPersonal1').value;
  const personal2 = document.querySelector('#SignupPersonal2').value;
  const prefer = document.querySelector('#SignupPrefer').value;
  const pwd = document.querySelector('#SignupPwd').value;
  const phone1 = document.querySelector('#PhoneNumber02').value;
  const phone2 = document.querySelector('#PhoneNumber03').value;
  const phone = `010${phone1}${phone2}`;
  const result = await axios.post('http://localhost:3000/users', {
    user: {
      name,
      email,
      personal1,
      personal2,
      prefer,
      pwd,
      phone,
    },
  });
  alert(result.data);
};
