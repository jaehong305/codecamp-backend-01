function solution(numbers) {
  var answer = new Set([]);
  for (let i = 0; i < numbers.length; i++) {
    for (let j = i + 1; j < numbers.length; j++) {
      const sum = numbers[i] + numbers[j];
      answer.add(sum);
    }
  }
  return [...answer].sort((a, c) => a - c);
}

solution([2, 1, 3, 4, 1]); // [2,3,4,5,6,7]

function solution2(numbers) {
  const answer = new Set([]);

  numbers.forEach((n1, i) => {
    numbers.slice(i + 1, numbers.length).forEach(n2 => {
      answer.add(n1 + n2);
    });
  });
  return Array.from(answer).sort((a, c) => a - c);
}

solution2([5, 0, 2, 7]); // [2,5,7,9,12]
