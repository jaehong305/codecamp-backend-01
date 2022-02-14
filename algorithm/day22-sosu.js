function aaa(e) {
  for (let i = 2; i <= parseInt(Math.sqrt(e)); i++) {
    if (e % i === 0) return false;
  }
  return true;
}

function solution(nums) {
  const sum = [];
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      for (let k = j + 1; k < nums.length; k++) {
        sum.push(nums[i] + nums[j] + nums[k]);
      }
    }
  }

  return sum.filter(e => {
    return aaa(e);
  }).length;
}

solution([1, 2, 3, 4]); // 1

function solution2(nums) {
  let answer = 0;
  let index = 0;

  nums.forEach((num1, i) => {
    index = i + 1;
    nums.slice(index).forEach(num2 => {
      index += 1;
      nums.slice(index).forEach(num3 => {
        const sum = num1 + num2 + num3;
        // 홀수일때만 검증
        let count = 0;
        if (sum % 2 === 1) {
          for (let j = 1; j <= sum; j++) {
            if (sum % j === 0) {
              count++;
              if (count > 2) {
                break;
              }
            }
          }
          if (count === 2) {
            answer++;
          }
        }
      });
    });
  });
  return answer;
}
