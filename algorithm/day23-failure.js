function solution(N, stages) {
  stages.sort((p, c) => p - c);

  const map = new Map();
  stages.forEach(e => {
    let value = map.get(e) || 0;
    if (e <= N) map.set(e, (value += 1));
  });

  let player = stages.length;
  for (let i = 1; i <= N; i++) {
    if (map.get(i)) {
      const failure = map.get(i) / player;
      player = player - map.get(i);
      map.set(i, failure);
    } else {
      map.set(i, 0);
    }
  }

  const mapSort = [...map.entries()].sort((p, c) => c[1] - p[1]);
  return mapSort.map((e, i) => {
    return e[0];
  });
}

solution(5, [2, 1, 2, 6, 2, 4, 3, 3]); // [ 3, 4, 2, 1, 5 ]
