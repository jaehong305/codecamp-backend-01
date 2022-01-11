function bigNum(str) {
  let biggest = 0;
  for (let i = 0; i < str.length; i++) {
    if (Number(str[i]) > biggest) {
      biggest = Number(str[i]);
    }
  }
  console.log(biggest);
}

bigNum('12345'); // 5
bigNum('87135'); // 8
