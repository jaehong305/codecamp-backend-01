function solution(s) {
  let countP = 0;
  let countC = 0;
  s.toLowerCase()
    .split('')
    .forEach(c => {
      if (c === 'p') {
        countP++;
      } else if (c === 'y') {
        countC++;
      }
    });
  return countP === countC;
}

solution('pPoooyY'); // true
