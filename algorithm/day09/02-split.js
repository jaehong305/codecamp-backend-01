function solution(s) {
  return s
    .split(' ')
    .map(e => {
      return e
        .split('')
        .map((c, i) => (i % 2 === 0 ? c.toUpperCase() : c.toLowerCase()))
        .join('');
    })
    .join(' ');
}

solution('try hello world'); // "TrY HeLlO WoRlD"
