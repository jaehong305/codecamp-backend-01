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
