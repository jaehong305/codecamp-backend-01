function solution(arr1, arr2) {
  return arr1.map((a, i) => a.map((n, j) => n + arr2[i][j]));
}

solution(
  [
    [1, 2],
    [2, 3],
  ],
  [
    [3, 4],
    [5, 6],
  ]
); // [[4,6],[7,9]]

function solution2(arr1, arr2) {
  var answer = [];
  for (var i = 0; i < arr1.length; i++) {
    answer[i] = [];
    for (var j = 0; j < arr1[i].length; j++) {
      answer[i].push(arr1[i][j] + arr2[i][j]);
    }
  }
  return answer;
}
