function solution(n) {
  let sum = n;
  for (let i = 1; i <= n / 2; i++) {
    if (n % i === 0) {
      sum += i;
    }
  }
  return sum;
}

console.log(solution(5)); // 6

function solution2(n) {
  return new Array(n).fill(1).reduce((a, c, i) => {
    const num = c + i;
    return n % num === 0 ? a + num : a;
  }, 0);
}
