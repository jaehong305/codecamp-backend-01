function solution(s) {
  let nums = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
  for (let i = 0; i < 10; i++) {
    s = s.split(nums[i]).join(i);
  }
  return +s;
}

solution('one4seveneight'); // 1478

function solution2(s) {
  const num = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
  for (let j = 0; j < 50; j++) {
    for (let i = 0; i < 10; i++) {
      s = s.replace(num[i], i);
    }
  }
  return +s;
}
