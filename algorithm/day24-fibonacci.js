function solution(n) {
  let a = 0;
  let b = 1;
  let fibo = 0;
  let count = 1;
  let flag = true;
  while (true) {
    fibo = (a + b) % 1234567;
    if (flag) {
      a = fibo;
      flag = false;
    } else {
      b = fibo;
      flag = true;
    }
    count++;
    if (count === n) break;
  }
  return fibo;
}

solution(3); // 2

function solution2(n) {
  let a = 0;
  let b = 1;
  let f = 0;
  for (let i = 2; i <= n; i++) {
    f = (a + b) % 1234567;
    a = b;
    b = f;
  }
  return f;
}
