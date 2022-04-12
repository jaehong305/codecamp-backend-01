const numbering = {
  '[': 0,
  ']': 1,
  '{': 2,
  '}': 3,
  '(': 4,
  ')': 5,
};

function solution(s) {
  let answer = 0;

  for (let i = 0; i < s.length; i++) {
    s = s.substring(1) + s[0];
    const stack = [];

    for (let l = 0; l < s.length; l++) {
      if (numbering[s[l]] % 2 === 0) {
        stack.push(numbering[s[l]]);
      } else {
        if (stack.includes(numbering[s[l]] - 1)) {
          const last = stack[stack.length - 1];

          if (last === numbering[s[l]] - 1) {
            stack.splice(stack.length - 1, 1);
          }
        } else {
          break;
        }
      }

      if (l === s.length - 1) {
        if (stack.length === 0) answer++;
      }
    }
  }
  return answer;
}

solution('[](){}'); // 3

function solution2(s) {
  return s.split('').reduce((a, c, i) => {
    const str = s.substring(i + 1) + s.substring(0, i + 1);

    let fail = false;
    const stack = str.split('').reduce((a2, c2) => {
      if (!fail) {
        if (numbering[c2] % 2 === 0) {
          a2.push(numbering[c2]);
        } else {
          if (a2[a2.length - 1] === numbering[c2] - 1) {
            a2.splice(a2.length - 1, 1);
          } else if (!a2.includes(numbering[c2] - 1)) {
            fail = true;
          }
        }
      }
      return a2;
    }, []);

    return (a += stack.length === 0 && !fail ? 1 : 0);
  }, 0);
}
