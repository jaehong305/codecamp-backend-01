function solution(n) {
  // 1. 3진법으로 변환
  n = n.toString(3);

  // 2. 앞뒤 반전 (뒤집기)
  let reverse = '';
  for (let i = n.length - 1; i >= 0; i--) {
    reverse += n[i];
  }

  // 3. 10진법으로 표현
  return parseInt(reverse, 3);
}

function solution2(n) {
  return parseInt([...n.toString(3)].reverse().join(''), 3);
}
