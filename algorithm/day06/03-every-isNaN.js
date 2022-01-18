function solution(s) {
  return [4, 6].includes(s.length) && s.split('').every(e => !Number.isNaN(+e));
}

console.log(solution('a234')); // false
console.log(solution('1234')); // true

function solution2(s) {
  if (s.length !== 4 && s.length !== 6) {
    return false;
  }
  for (let i = 0; i < s.length; i++) {
    if (isNaN(s[i])) {
      return false;
    }
  }
  return true;
}

function solution3(s) {
  if (![4, 6].includes(s.length)) {
    return false;
  }
  const answer = s.split('').filter(num => {
    return isNaN(num);
  });
  return answer.length === 0;
}
