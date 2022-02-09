function solution(n, m) {
  let g = 1;
  for (let i = 2; i <= Math.min(n, m); i++) {
    if (n % i === 0 && m % i === 0) g = i;
  }

  let x = 1;
  while (true) {
    if (x % n === 0 && x % m === 0) break;
    x++;
  }

  // let min = 0;
  // for (let i = m; i <= n * m; i += m) {
  //     if (i % n === 0) {
  //         min = i;
  //         break;
  //     }
  // }
  return [g, x];
}

solution(3, 12); // [3, 12];

// 유클리드 호제법 - 최대공약수를 구하기 위한 알고리즘(공식)
// a를 b로 나눴을 때 (큰 수를 작은 수로 나눴을 때)
// 나머지 값이 0이 되면, 작은 수가 최대공약수가 된다.
// 0이 되지 않으면 작은 수가 큰 수가 되고 나머지값이 작은 수가 된다.
// 다시 나누는 과정을 반복해서 나머지값이 0이 나오면, 작은 수가 최대공약수가 된다.
function solution2(n, m) {
  let a = m; // 큰 수
  let b = n; // 작은 수
  let r = 0; // a를 b로 나눴을 때 나머지 값이 들어온다.

  while (a % b > 0) {
    r = a % b;
    a = b; // 큰 수에 작은 수를 다시 할당
    b = r; // 작은 수에 나머지값을 할당
  }

  // 최대공배수: n과 m을 곱한 값에 최대공약수를 나눠준 값
  return [b, (n * m) / b];
}
