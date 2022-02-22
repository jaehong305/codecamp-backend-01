function solution(s) {
  let count = 0; // 변환 횟수
  let remove = 0; // 0이 제거된 수

  while (s !== '1') {
    count++;
    let temp = '';
    for (let i = 0; i < s.length; i++) {
      if (s[i] === '0') {
        // 0이 있을 때를 찾는다.
        remove++;
        continue;
      }
      temp += s[i]; // 1만 담기
    }
    s = temp.length;
    s = s.toString(2);
  }

  return [count, remove];
}

function solution2(s) {
  // recursion 함수 (재귀함수)
  // 1. 해당 함수를 결과가 나올 때까지 무한 실행
  // while문과 동일한 방식 (while을 대체)
  // 2. 실행하는 함수 안에서 해당 함수를 리턴 실행

  let [count, remove] = [0, 0];
  function recursion(s) {
    if (s === '1') {
      return [count, remove];
    }
    count++;
    const removeList = s.split('').filter(e => e === '0');
    remove += removeList.length;
    s = s.split('').filter(e => e !== '0').length;

    return recursion(s.toString(2));
  }

  return recursion(s);
}
