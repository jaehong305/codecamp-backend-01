function solution(nums) {
  const get = nums.length / 2;
  const set = new Set(nums).size;
  return get >= set ? set : get;
}

solution([3, 1, 2, 3]); // 2

function solution2(nums) {
  // const answer = [];
  const answer = new Set([]);
  for (let i = 0; i < nums.length; i++) {
    // if ((answer.includes(nums[i]) === false) &&
    //     (nums.length/2) !== answer.length) {
    //   answer.push(nums[i])
    // }
    if (nums.length / 2 !== answer.size) {
      answer.add(nums[i]);
    }
  }
  // return answer.length
  return answer.size;
}
