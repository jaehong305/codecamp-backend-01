function solution(s) {
  return s.split('').sort().reverse().join('');
}

solution('ZbcDefg'); // 'gfecbZD'

function solution2(s) {
  return s
    .split('')
    .sort((a, b) => {
      return a > b ? -1 : 1; // 내림차순
    })
    .join('');
}
