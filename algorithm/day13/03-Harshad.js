function solution(x) {
  return x % (x + '').split('').reduce((a, c) => +a + +c) === 0;
}

solution(10); // true
