// 휴대폰 인증 토큰 전송하기
const getValidationNumber = async () => {
  document.querySelector('#ValidationInputWrapper').style.display = 'flex';
  console.log('인증 번호 전송');
  const phone1 = document.querySelector('#PhoneNumber02').value;
  const phone2 = document.querySelector('#PhoneNumber03').value;
  const phone = `010${phone1}${phone2}`;
  axios.post('http://localhost:3005/tokens/phone', { phone });
};

// 회원 가입 API 요청
const submitSignup = async () => {
  console.log('회원 가입 이메일 전송');
  const name = document.querySelector('#SignupName').value;
  const personal = document.querySelector('#SignupPersonal').value;
  const phone1 = document.querySelector('#PhoneNumber02').value;
  const phone2 = document.querySelector('#PhoneNumber03').value;
  const phone = `010${phone1}${phone2}`;
  const prefer = document.querySelector('#SignupPrefer').value;
  const email = document.querySelector('#SignupEmail').value;
  const password = document.querySelector('#SignupPwd').value;
  axios.post('http://localhost:3005/users', {
    user: {
      name,
      personal,
      phone,
      prefer,
      email,
      password,
    },
  });
};
