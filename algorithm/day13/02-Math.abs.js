function adder(a, b) {
  return ((a + b) * (Math.abs(b - a) + 1)) / 2;
}

adder(3, 5); // 12

function adder2(a, b, s = 0) {
  for (let i = Math.min(a, b); i <= Math.max(a, b); i++) s += i;
  return s;
}

adder2(5, 3); // 12
