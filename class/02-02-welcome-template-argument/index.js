const apple = 3;
const banana = 2;

console.log('철수는 사과를 ' + apple + '개, ' + '바나나를 ' + banana + '개 가지고 있습니다.');
console.log(`철수는 사과를 ${apple}개, 바나나를 ${banana}개 가지고 있습니다.`);

function getWelcomeTemplate(name, age, school) {
  const createdAt = '2010-09-07'; // 시간 관련부분은 Back에서 다룬다 Front는 브라우저마다 시간이 다를 수 있음.

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

const myname = '철수';
const myage = 8;
const myschool = '다람쥐초등학교';
getWelcomeTemplate(myname, myage, myschool);
