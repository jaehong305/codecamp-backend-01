function solution(n) {
  let answer = -1;
  for (let i = 1; i * i <= n; i++) {
    if (i * i === n) {
      return (i + 1) ** 2;
    }
  }
  return answer;
}

solution(121); // 144

function solution2(n) {
  return Number.isInteger(Math.sqrt(n)) ? Math.pow(Math.sqrt(n) + 1, 2) : -1;
}

solution2(3); // -1
