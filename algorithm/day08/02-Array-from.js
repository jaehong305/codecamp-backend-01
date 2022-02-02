function solution(x, n) {
  return Array.from({ length: n }, (v, i) => (i + 1) * x);
}

solution(2, 5); // [ 2, 4, 6, 8, 10 ]
