function solution(participant, completion) {
  const p = participant.sort();
  const c = completion.sort();
  return p.filter((e, i) => {
    return e !== c[i];
  })[0];
}

solution(['mislav', 'stanko', 'mislav', 'ana'], ['stanko', 'ana', 'mislav']); // "mislav"

function solution2(participant, completion) {
  for (let i = 0; i < completion.length; i++) {
    if (participant.includes(completion[i])) {
      participant.splice(participant.indexOf(completion[i]), 1);
    }
  }
  return participant[0]; // 효율성 실패
}
