function solution(progresses, speeds) {
  const answer = [];
  let day = 0;
  // let idx = 0
  for (let i = 0; i < progresses.length; i++) {
    const process = Math.ceil((100 - progresses[i]) / speeds[i]);

    if (process > day) {
      day = process;

      // if (answer[idx] === undefined) {
      //     answer[idx] = 1;
      //     idx++;
      // }
      answer[answer.length] = 1;
    } else if (day >= process) {
      answer[answer.length - 1]++;
    }
  }
  return answer;
}

solution([93, 30, 55], [1, 30, 5]); // [2, 1]

function solution2(progresses, speeds) {
  let day = 0;
  return progresses
    .map((e, i) => {
      const process = Math.ceil((100 - e) / speeds[i]);

      if (process > day) day = process;
      return day;
    })
    .reduce((a, c, i, array) => {
      if (c !== array[i - 1]) {
        a[a.length] = 1;
      } else {
        a[a.length - 1]++;
      }
      return a;
    }, []);
}

function solution3(progresses, speeds) {
  let day = 0;
  return progresses.reduce((a, c, i) => {
    const process = Math.ceil((100 - c) / speeds[i]);

    if (process > day) {
      day = process;
      a[a.length] = 1;
    } else if (process <= day) {
      a[a.length - 1]++;
    }
    return a;
  }, []);
}
