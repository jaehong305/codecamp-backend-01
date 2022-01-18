function solution(n) {
  return String(n)
    .split('')
    .map(e => +e)
    .reduce((a, c) => a + c);
}

solution(123); // 6
