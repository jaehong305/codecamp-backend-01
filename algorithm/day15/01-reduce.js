function solution(absolutes, signs) {
  return absolutes.map((e, i) => (signs[i] ? e : -e)).reduce((a, c) => a + c);
}

solution([4, 7, 12], [false, false, true]); // 9

function solution2(absolutes, signs) {
  return absolutes.reduce((a, c, i) => a + c * (signs[i] ? 1 : -1), 0);
}

function solution3(absolutes, signs) {
  return absolutes.reduce((a, c, i) => signs[i] ? a + c : a - c, 0);
}
