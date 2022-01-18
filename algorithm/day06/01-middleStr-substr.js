function solution(s) {
  const center = Math.floor(s.length / 2);
  let answer = s[center];

  if (s.length % 2 === 0) {
    answer = s[center - 1] + answer;
  }
  return answer;
}

console.log(solution('abcde')); // 'c'
console.log(solution('abcdef')); // 'cd'

function solution2(s) {
  const centerIndex = Math.floor(s.length / 2);
  return s.length % 2 === 1 ? s[centerIndex] : s.slice(centerIndex - 1, centerIndex + 1);
}

// s.substr(Math.ceil(s.length / 2) - 1, s.length % 2 ? 1 : 2);
