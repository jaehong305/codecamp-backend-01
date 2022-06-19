function bigNum(str) {
  let biggest = 0;
  for (let i = 0; i < str.length; i++) {
    if (Number(str[i]) > biggest) {
      biggest = Number(str[i]);
    }
  }
  console.log(biggest);
}

function bigNum2(str) {
  const numArray = str.split("").map((e) => +e);
  return Math.max(...numArray);
}

bigNum("12345"); // 5
bigNum("87135"); // 8
