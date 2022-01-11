const apple = 3;
const banana = 2;

console.log('철수는 사과를 ' + apple + '개, ' + '바나나를 ' + banana + '개 가지고 있습니다.');
console.log(`철수는 사과를 ${apple}개, 바나나를 ${banana}개 가지고 있습니다.`);

function getCreatedAt() {
  const aaa = new Date();
  const yyyy = aaa.getFullYear();
  const mm = aaa.getMonth() + 1;
  const dd = aaa.getDate(); // getDay() 요일(0~6/일~토)

  return `${yyyy}-${mm}-${dd}`;
}

function getWelcomeTemplate({ name, age, school }) {
  const createdAt = getCreatedAt(); // 시간 관련부분은 Back에서 다룬다 Front는 브라우저마다 시간이 다를 수 있음.

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
}

const myuser = {
  name: '철수',
  age: 8,
  school: '다람쥐초등학교',
  email: 'a@a.com',
};
getWelcomeTemplate(myuser);
