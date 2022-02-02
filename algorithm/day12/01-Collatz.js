function solution(num) {
  let count = 0;
  while (count < 500) {
    if (num === 1) return count;

    if (num % 2 === 0) {
      num = num / 2;
      count++;
    } else {
      num = num * 3 + 1;
      count++;
    }
  }
  return -1;
}

solution(16); // 4

function solution2(num) {
  let answer = 0;

  new Array(500).fill(1).forEach(e => {
    if (num !== 1) {
      answer++;
      num = num % 2 === 0 ? num / 2 : num * 3 + 1;
    }
  });
  return num !== 1 ? -1 : answer;
}

solution2(6); // 8
