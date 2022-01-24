function solution(array, commands) {
  return commands.map(e => {
    const [i, j, k] = e;
    return array.slice(i - 1, j).sort((p, c) => p - c)[k - 1];
  });
}

solution(
  [1, 5, 2, 6, 3, 7, 4],
  [
    [2, 5, 3],
    [4, 4, 1],
    [1, 7, 3],
  ]
); // [5, 6, 3]

function solution2(array, commands) {
  return commands.map(e => {
    return array.slice(e[0] - 1, e[1]).sort((p, c) => p - c)[e[2] - 1];
  });
}
