function countLetter(str) {
  let count = 0;
  str.toLowerCase();
  for (let i = 0; i < str.length; i++) {
    if (str[i] === 'a') {
      count++;
    }
  }
  console.log(count);
}

countLetter('I am from Korea'); // 2
countLetter('A day without laughter is a day wasted.'); // 6
