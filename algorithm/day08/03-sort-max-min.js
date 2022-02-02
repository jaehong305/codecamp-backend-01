let s = '2 4 1 3';

function solution(s) {
  const arr = s
    .split(' ')
    .map(e => +e)
    .sort((p, c) => p - c);
  return `${arr[0]} ${arr[arr.length - 1]}`;
}
console.log(solution(s)); // '1 4'

function solution2(s) {
  const arr = s.split(' ');
  return `${Math.min(...arr)} ${Math.max(...arr)}`;
}
console.log(solution2(s)); // '1 4'
