function solution(s) {
  return s.substr(Math.ceil(s.length / 2) - 1, s.length % 2 ? 1 : 2);
}

console.log(solution('abcde')); // 'c'
console.log(solution('abcdef')); // 'cd'
