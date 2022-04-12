function solution(record) {
  const answer = [];

  const users = {};
  for (let i = 0; i < record.length; i++) {
    const infos = record[i].split(' ');

    if (infos[2]) {
      users[infos[1]] = infos[2];
    }

    if (infos[0] !== 'Change') {
      answer.push({
        action: infos[0],
        uid: infos[1],
      });
    }
  }

  for (let idx in answer) {
    answer[idx] =
      users[answer[idx].uid] +
      (answer[idx].action === 'Enter' ? '님이 들어왔습니다.' : '님이 나갔습니다.');
  }
  return answer;
}

solution([
  'Enter uid1234 Muzi',
  'Enter uid4567 Prodo',
  'Leave uid1234',
  'Enter uid1234 Prodo',
  'Change uid4567 Ryan',
]); // ["Prodo님이 들어왔습니다.", "Ryan님이 들어왔습니다.", "Prodo님이 나갔습니다.", "Prodo님이 들어왔습니다."]

function solution2(record) {
  record = record.map(e => e.split(' '));
  const users = record.reduce((a, c) => {
    if (c[2]) {
      a[c[1]] = c[2];
    }
    return a;
  }, {});

  const answer = record.reduce((a, c) => {
    if (c[0] !== 'Change') {
      a.push(`${users[c[1]]}님이 ` + (c[0] === 'Enter' ? '들어왔습니다.' : '나갔습니다.'));
    }
    return a;
  }, []);
  return answer;
}
