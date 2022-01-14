import express from 'express';
const app = express();
app.use(express.json()); // json 요청 연결시켜줌.

app.get('/boards', function (req, res) {
  // 데이터를 조회하는 로직 => DB에서 꺼내옴
  // res.send('조회에 성공하였습니다.');
  res.send([
    { number: 1, writer: '철수', title: '철수입니다.', contents: '철수의 내용입니다~' },
    { number: 2, writer: '영희', title: '영희입니다.', contents: '영희의 내용입니다~' },
    { number: 3, writer: '훈이', title: '훈이입니다.', contents: '훈이의 내용입니다~' },
  ]);
});

// 요청방식만 바꾸고 이름(엔드라인)은 같게 : restful하다.
app.post('/boards', function (req, res) {
  // 데이터를 등록하는 로직 => DB에다 저장함
  // console.log(req);
  console.log(req.body);
  res.send('등록에 성공하였습니다.');
});

app.listen(3001);
