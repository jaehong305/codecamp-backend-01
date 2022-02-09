const solution = answer => {
  const a = [1, 2, 3, 4, 5];
  const b = [2, 1, 2, 3, 2, 4, 2, 5];
  const c = [3, 3, 1, 1, 2, 2, 4, 4, 5, 5];
  let i = -1;
  const as = answer.filter(e => {
    if (i > 3) {
      i = -1;
    }
    i++;
    return e === a[i];
  }).length;

  let j = -1;
  const bs = answer.filter(e => {
    if (j > 6) {
      j = -1;
    }
    j++;
    return e === b[j];
  }).length;

  let k = -1;
  const cs = answer.filter(e => {
    if (k > 8) {
      k = -1;
    }
    k++;
    return e === c[k];
  }).length;

  const map = new Map([
    [1, as],
    [2, bs],
    [3, cs],
  ]);

  let big = 0;
  map.forEach(v => {
    if (big <= v) {
      big = v;
    }
  });

  let win = [];
  map.forEach((v, k) => {
    if (v === big) {
      win.push(k);
    }
  });

  return win;
};

solution([1, 2, 3, 4, 5]); // [1]

const answerTable = [
  [1, 2, 3, 4, 5],
  [2, 1, 2, 3, 2, 4, 2, 5],
  [3, 3, 1, 1, 2, 2, 4, 4, 5, 5],
];
const solution2 = answers => {
  const score = [0, 0, 0];

  for (let i = 0; i < answers.length; i++) {
    for (let l = 0; l < answerTable.length; l++) {
      if (answerTable[l][i % answerTable[l].length] === answers[i]) {
        score[l]++;
      }
    }
  }
  const biggest = Math.max(...score);
  const answer = [];
  for (let i = 0; i < score.length; i++) {
    if (biggest === score[i]) {
      answer.push(i + 1);
    }
  }
  return answer;
};

function solution3(answers) {
  const scoreList = answerTable.map((e, i) => {
    const score = answers.reduce((a, c, l) => {
      return a + (e[l % e.length] === c ? 1 : 0);
    }, 0);
    return { student: i + 1, score };
  });

  const biggest = Math.max(...scoreList.map(e => e.score));
  return scoreList.filter(e => biggest === e.score).map(e => e.student);
}
