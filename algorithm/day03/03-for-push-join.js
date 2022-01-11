function makeNumber(num) {
  const array = [];
  for (let i = 1; i <= num; i++) {
    array.push(i);
  }
  const result = array.join('-');
  console.log(result);
}

makeNumber(5); // 1-2-3-4-5
makeNumber(7); // 1-2-3-4-5-6-7
