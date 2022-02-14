let nums = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
function solution(s) {
  for (let i = 0; i < 10; i++) {
    s = s.split(nums[i]).join(i);
  }
  return +s;
}

solution('one4seveneight'); // 1478

function solution2(s) {
  for (let j = 0; j < 50; j++) {
    for (let i = 0; i < 10; i++) {
      s = s.replace(nums[i], i);
    }
  }
  return +s;
}

function solution3(s) {
  for (let i = 0; i < 10; i++) {
    while (s.includes(nums[i])) {
      // replaceAll(nums[i], i)과 동일
      s = s.replace(nums[i], i);
    }
  }
  return +s;
}

function solution4(s) {
  for (let i = 0; i < 10; i++) {
    const reg = new RegExp(nums[i], 'g');
    s = s.replace(reg, i);
  }
  return +s;
}
