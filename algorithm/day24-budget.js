function solution(d, budget) {
  if (d.reduce((a, c) => a + c) <= budget) {
    return d.length;
  } else {
    d.sort((f, b) => f - b);
    let sum = 0;
    let index = 0;
    for (let i = 0; i < d.length; i++) {
      if (sum <= budget) {
        sum += d[i];
        index = i;
      }
    }
    return sum > budget ? index : index + 1;
  }
}

solution([1, 3, 2, 5, 4], 9); // 3
