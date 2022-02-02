function solution(arr) {
  var answer = [];

  let min = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < min) {
      min = arr[i];
    }
  }

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== min) {
      answer.push(arr[i]);
    }
  }
  return answer.length === 0 ? [-1] : answer;
}

solution([4, 3, 2, 1]); // [4, 3, 2]

function solution2(arr) {
  const min = Math.min(...arr);
  const answer = arr.filter(e => {
    return e !== min;
  });
  return answer.length === 0 ? [-1] : answer;
}

solution2([10]); // [-1]
