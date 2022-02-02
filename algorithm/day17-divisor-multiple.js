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
  return [g, x];
}

solution(3, 12); // [3, 12];
