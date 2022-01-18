function solution(arr) {
  return arr.filter((e, i) => e !== arr[i + 1]);
}

const a = [1, 1, 3, 3, 0, 1];
console.log(solution(a)); // [1, 3, 0, 1]
