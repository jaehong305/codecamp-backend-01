function solution(n, words) {
  for (let i = 1; i < words.length; i++) {
    const player = (i % n) + 1;
    const turn = Math.floor(i / n) + 1;

    const prevWord = words[i - 1][words[i - 1].length - 1];
    const firstWord = words[i][0];

    if (prevWord !== firstWord || words.indexOf(words[i]) !== i) {
      return [player, turn];
    }
  }
  return [0, 0];
}

solution(3, ['tank', 'kick', 'know', 'wheel', 'land', 'dream', 'mother', 'robot', 'tank']); // [3,3]

function solution2(n, words) {
  let stop = false;
  return words.slice(1).reduce(
    (a, c, i) => {
      const prev = words[i];

      i++;
      const player = (i % n) + 1;
      const turn = Math.floor(i / n) + 1;

      if (!stop) {
        if (c[0] !== prev[prev.length - 1] || words.indexOf(c) !== i) {
          stop = true;
          return [player, turn];
        }
      }

      return a;
    },
    [0, 0]
  );
}
