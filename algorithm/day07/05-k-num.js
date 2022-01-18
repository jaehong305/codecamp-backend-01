function solution(array, commands) {
  const arr = [];
  commands.forEach(e => {
    const [i, j, k] = e;
    const a = array.slice(i - 1, j).sort((p, c) => p - c)[k - 1];
    arr.push(a);
  });
  return arr;
}

solution(
  [1, 5, 2, 6, 3, 7, 4],
  [
    [2, 5, 3],
    [4, 4, 1],
    [1, 7, 3],
  ]
); // [5, 6, 3]
