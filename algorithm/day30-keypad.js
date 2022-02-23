function solution(numbers, hand) {
  let answer = '';
  let left = '*';
  let right = '#';
  let lefts = [1, 4, 7];
  let rights = [3, 6, 9];
  const two = {
    1: 1,
    4: 2,
    7: 3,
    '*': 4,
    2: 0,
    5: 1,
    8: 2,
    0: 3,
    3: 1,
    6: 2,
    9: 3,
    '#': 4,
  };
  const five = {
    1: 2,
    4: 1,
    7: 2,
    '*': 3,
    2: 1,
    5: 0,
    8: 1,
    0: 2,
    3: 2,
    6: 1,
    9: 2,
    '#': 3,
  };
  const eight = {
    1: 3,
    4: 2,
    7: 1,
    '*': 2,
    2: 2,
    5: 1,
    8: 0,
    0: 1,
    3: 3,
    6: 2,
    9: 1,
    '#': 2,
  };
  const zero = {
    1: 4,
    4: 3,
    7: 2,
    '*': 1,
    2: 3,
    5: 2,
    8: 1,
    0: 0,
    3: 4,
    6: 3,
    9: 2,
    '#': 1,
  };
  numbers.forEach(e => {
    if (lefts.includes(e)) {
      left = e;
      answer += 'L';
    } else if (rights.includes(e)) {
      right = e;
      answer += 'R';
    } else {
      function a(leftD, rightD) {
        if (leftD < rightD) {
          left = e;
          answer += 'L';
        } else if (leftD > rightD) {
          right = e;
          answer += 'R';
        } else {
          if (hand === 'right') {
            right = e;
            answer += 'R';
          } else {
            left = e;
            answer += 'L';
          }
        }
      }
      if (e === 2) {
        a(two[left], two[right]);
      }
      if (e === 5) {
        a(five[left], five[right]);
      }
      if (e === 8) {
        a(eight[left], eight[right]);
      }
      if (e === 0) {
        a(zero[left], zero[right]);
      }
    }
  });
  return answer;
}

solution([1, 2, 3, 4, 5, 6, 7, 8, 9, 0], 'right'); // "LLRLLRLLRL"
