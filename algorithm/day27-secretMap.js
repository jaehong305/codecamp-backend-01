function solution(n, arr1, arr2) {
  var answer = [];
  for (let i = 0; i < arr1.length; i++) {
    answer[i] = '';

    const map1 = arr1[i].toString(2).padStart(n, '0');
    const map2 = arr2[i].toString(2).padStart(n, '0');

    for (let l = 0; l < map1.length; l++) {
      if (map1[l] === '1' || map2[l] === '1') {
        answer[i] += '#';
      } else {
        answer[i] += ' ';
      }
    }
  }
  return answer;
}

solution(5, [9, 20, 28, 18, 11], [30, 1, 21, 17, 28]); // ["#####","# # #", "### #", "# ##", "#####"]

function solution2(n, arr1, arr2) {
  const answer = arr1.map((map1, i) => {
    map1 = map1.toString(2).padStart(n, '0');
    const map2 = arr2[i].toString(2).padStart(n, '0');

    return map1.split('').reduce((a, c, l) => {
      console.log(a, c, map2[l]);
      return a + (c === '1' || map2[l] === '1' ? '#' : ' ');
    }, '');
  });
  return answer;
}
