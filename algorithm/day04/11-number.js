function solution(s) {
  if (s.length < 1 || s.length > 5) {
    console.log('error! 1~5자 제한');
    return;
  } else if (s.startsWith('0')) {
    console.log('error! 0으로 시작');
    return;
  }
  const answer = Number(s);
  return answer;
}

console.log(solution('-1234')); // -1234
