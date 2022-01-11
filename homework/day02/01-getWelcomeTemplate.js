// 회원가입을 축하하는 형태의 템플릿을 출력하는 함수를 만들어 주세요.
// 이메일, 주민번호, 휴대폰번호, 내가 좋아하는 사이트를 함수의 입력으로 받고, 해당 내용이 템플릿에 포함되어 콘솔에 출력되어야합니다.
// 콘솔에 출력된 화면의 캡쳐본과 코드를 클래스룸에 제출해주세요.

function getWelcomeTemplate({ email, socialNumber, phone, favoriteSite }) {
  return `
	    <html>
	        <body>
	            <h1>가입을 환영합니다.</h1>
	            <div>이메일: ${email}</div>
	            <div>주민번호: ${socialNumber}</div>
	            <div>휴대폰번호: ${phone}</div>
	            <div>좋아하는 사이트: ${favoriteSite}</div>
	        </body>
	    </html>
	`;
}

const user = {
  email: 'codecamp@gmail.com',
  socialNumber: '900101-1111111',
  phone: '01012345678',
  favoriteSite: 'youtube',
};

const result = getWelcomeTemplate(user);
console.log(result);
