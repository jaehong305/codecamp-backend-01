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
