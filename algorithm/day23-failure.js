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

function solution2(N, stages) {
  stages.sort((a, b) => a - b);

  const failArr = []; // 스테이지에 해당되는 유저 수, 실패율을 저장하는 배열
  for (let i = 1; i <= N; i++) {
    failArr.push({
      stage: i, // 스테이지 번호
      users: 0, // 클리어 하지 못한 유저의 수
      fail: 0, // 실패율
    });
  }

  let allUsers = stages.length; // 총 유저의 수를 저장
  for (let i = 0; i < stages.length; i++) {
    if (failArr[stages[i] - 1] !== undefined) {
      failArr[stages[i] - 1].users++;

      // 현재 스테이지 번호와 다음 스테이지 번호가 동일하지 않을 때
      // 현재 스테이지에 대한 정보가 끝났을 때
      if (stages[i] !== stages[i + 1]) {
        const fail = failArr[stages[i] - 1].users / allUsers;
        allUsers -= failArr[stages[i] - 1].users;

        failArr[stages[i] - 1].fail = fail;
      }
    }
  }
  const answer = failArr
    .sort((a, b) => {
      return b.fail - a.fail; // 내림차순
    })
    .map(el => {
      return el.stage;
    });
  return answer;
}

function solution3(N, stages) {
  stages.sort((a, b) => a - b);

  let allUsers = stages.length; // 총 유저의 수
  const answer = new Array(N)
    .fill(1)
    .map((num, i) => {
      const stage = num + i;
      const arr = stages.slice(stages.indexOf(stage), stages.lastIndexOf(stage) + 1);
      const fail = arr.length / allUsers;
      allUsers -= arr.length;

      return { stage, fail };
    })
    .sort((a, b) => {
      return b.fail - a.fail; // 내림차순
    })
    .map(el => el.stage);
  return answer;
}
