// 날짜/시간을 생성하는 함수를 하나 만들고, 해당 함수를 실행하면
// “오늘은 2020년 12월 2일 11:30:29 입니다.” 라는 메시지가 콘솔에 출력되도록 만들어 주세요.콘솔에 출력된 화면의 캡쳐본과 코드를 클래스룸에 제출해주세요.

function today() {
  const date = new Date();
  const yyyy = date.getFullYear();
  const MM = date.getMonth() + 1;
  const dd = date.getDate();
  const hh = date.getHours();
  const mm = date.getMinutes();
  const ss = date.getSeconds();
  return `오늘은 ${yyyy}년 ${MM}월 ${dd}일 ${hh}:${mm}:${ss} 입니다.`;
}

console.log(today());
