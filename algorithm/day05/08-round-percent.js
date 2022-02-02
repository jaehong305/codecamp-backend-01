const TodoList = [
  { work: '청소', finish: false },
  { work: '미적분 과제', finish: true },
  { work: '논문 해석', finish: false },
  { work: '알고리즘 풀기', finish: false },
  { work: '미니홈피 제작', finish: false },
  { work: 'Blog 글 쓰기', finish: true },
];

let count = 0;
TodoList.forEach(data => {
  if (data.finish) {
    count++;
  }
});

const per = Math.round((count / TodoList.length) * 100);

console.log(`총 ${per}% 진행하셨습니다.`); // 총 33% 진행하셨습니다.
