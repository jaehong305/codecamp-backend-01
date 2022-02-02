function solution(n) {
  return (n + '')
    .split('')
    .reverse()
    .map(e => +e);
}

solution(12345); // [5,4,3,2,1]
