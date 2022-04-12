function solution(people, limit) {
  people.sort((p, c) => c - p);

  let answer = 0;
  let end = people.length - 1;
  for (let i = 0; i < people.length; i++) {
    const weight = limit - people[i];
    answer++;

    if (weight >= people[end]) {
      end--;
    }

    if (i >= end) {
      return answer;
    }
  }
}

solution([70, 50, 80, 50], 100); // 3

function solution2(people, limit) {
  people.sort((p, c) => c - p);

  let end = people.length - 1;
  return people.reduce((a, c, i) => {
    if (i <= end) {
      const weight = limit - c;
      a++;
      if (weight >= people[end]) end--;
    }
    return a;
  }, 0);
}
