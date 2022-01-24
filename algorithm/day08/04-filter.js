function solution(arr, divisor) {
  const arr2 = arr.filter(e => e % divisor === 0);
  return arr2.length ? arr2.sort((p, c) => p - c) : [-1];
}

solution([5, 9, 7, 10], 5); // [5, 10]
