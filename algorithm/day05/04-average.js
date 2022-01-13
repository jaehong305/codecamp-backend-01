const solution = arr => {
  let sum = 0;
  arr.forEach(e => {
    sum += e;
  });
  return sum / arr.length;
};

// const solution = arr => arr.reduce((a, b) => a + b) / arr.length;
