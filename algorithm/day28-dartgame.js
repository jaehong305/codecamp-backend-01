const bonus = ['S', 'D', 'T'];
const option = ['*', '#'];
function solution(dartResult) {
  const answer = [];

  let score = '';
  for (let i = 0; i < dartResult.length; i++) {
    if (isNaN(dartResult[i]) === false) {
      // 숫자인 경우
      score += dartResult[i];
    } else {
      // 숫자가 아닌 경우
      if (bonus.includes(dartResult[i])) {
        score = Number(score);
        if (dartResult[i] === 'D') {
          score = score ** 2;
        } else if (dartResult[i] === 'T') {
          score = Math.pow(score, 3);
        }
      }
      if (score !== '') answer.push(score);
      score = '';

      if (option.includes(dartResult[i])) {
        if (dartResult[i] === '#') {
          answer[answer.length - 1] *= -1;
        } else {
          answer[answer.length - 1] *= 2;

          if (answer.length > 1) {
            answer[answer.length - 2] *= 2;
          }
        }
      }
    }
  }
  let sum = 0;
  for (let i = 0; i < answer.length; i++) {
    sum += answer[i];
  }
  return sum;
}

solution('1S2D*3T'); // 37

const bonus = ['S', 'D', 'T'];
function solution(dartResult) {
  let score = '';
  let currentValue = 0;
  let last = false;

  const answer = dartResult
    .split('')
    .reduce((a, c, i) => {
      if (isNaN(c) === false) {
        score += c;
        last = false;
      } else if (bonus.includes(c)) {
        score = Number(score);
        const squared = bonus.indexOf(c) + 1;

        currentValue = score ** squared;
        score = '';

        if (isNaN(dartResult[i + 1]) === false || i + 1 === dartResult.length) {
          last = true;
        }
      } else {
        last = true;
        if (c === '*') {
          currentValue *= 2;

          if (a.length > 0) {
            a[a.length - 1] *= 2;
          }
        } else {
          currentValue *= -1;
        }
      }
      if (last) {
        a.push(currentValue);
      }
      return a;
    }, [])
    .reduce((a, c) => {
      return a + c;
    }, 0);
  return answer;
}
