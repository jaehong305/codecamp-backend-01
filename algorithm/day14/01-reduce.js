function solution(a, b) {
  return a
    .map((e, i) => {
      return e * b[i];
    })
    .reduce((a, c) => a + c);
}

solution([1, 2, 3, 4], [-3, -1, 0, 2]); //	3

function solution2(a, b) {
  return a.reduce((a, c, i) => (a += c * b[i]), 0);
}
