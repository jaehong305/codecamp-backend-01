function solution(s) {
  const arr = s
    .split(' ')
    .map(e => +e)
    .sort((p, c) => p - c);
  return `${arr[0]} ${arr[arr.length - 1]}`;
}

let s = '2 4 1 3';
console.log(solution(s)); // '1 4'

function solution2(s) {
  const arr = s.split(' ');
  return `${Math.min(...arr)} ${Math.max(...arr)}`;
}

let s2 = '2 4 1 3';
console.log(solution2(s)); // '1 4'
