function solution(n) {
  return String(n)
    .split("")
    .reduce((a, c) => a + c / 1, 0);
}

solution(123); // 6

function solution2(n) {
  return (n + "").split("").reduce((a, c) => a + +c, 0);
}
