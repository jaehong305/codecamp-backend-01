function solution(numbers) {
  let sum = 0;
  for (let i = 0; i < 10; i++) {
    if (!numbers.includes(i)) sum += i;
  }
  return sum;
}

solution([1, 2, 3, 4, 6, 7, 8, 0]); // 14

function solution2(numbers) {
  return new Array(9).fill(1).reduce((a, c, i) => {
    return numbers.includes(c + i) ? a : a + (c + i);
  }, 0);
}

solution2([5, 8, 4, 0, 6, 7, 9]); // 6
