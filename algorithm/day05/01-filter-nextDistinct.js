function solution(arr) {
  return arr.filter((el, id) => el !== arr[id + 1]);
}

const a = [1, 1, 3, 3, 0, 1];
console.log(solution(a)); // [1, 3, 0, 1]
