function solution(n) {
  return String(n)
    .split('')
    .reduce((a, c) => a + c / 1, 0);
}

solution(123); // 6
