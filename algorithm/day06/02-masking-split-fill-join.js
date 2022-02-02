function solution(phone_number) {
  return phone_number.split('').fill('*', 0, -4).join('');
}

solution('01012345678'); // '*******5678'

// const solution = n => [...n].fill("*",0,-4).join("");
// const solution = s => "*".repeat(s.length - 4) + s.slice(-4);
