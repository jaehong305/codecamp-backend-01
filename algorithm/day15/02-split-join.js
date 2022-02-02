function solution(s) {
  return s
    .split(' ')
    .map(e => e && e[0].toUpperCase() + e.slice(1).toLowerCase()) // e.substr(1).toLowerCase()
    .join(' ');
}

solution('3people unFollowed me'); // "3people Unfollowed Me"

function solution2(s) {
  let answer = '';
  s = s.toLowerCase();
  let idx = 0;
  for (let i = 0; i < s.length; i++) {
    let word = s[i];
    if (s[i] === '') {
      idx = 0;
    } else {
      if (idx === 0) {
        word = s[i].toUpperCase();
      }
      idx++;
    }
    answer += word;
  }
  return answer;
}
