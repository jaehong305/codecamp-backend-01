import axios from 'axios';

function fetchPost() {
  const result = axios.get('https://koreanjson.com/posts/1');
  console.log(result); // Promise { <pending> } - 비동기라 바로 밑에줄 실행.
}

async function fetchPost2() {
  const result = await axios.get('https://koreanjson.com/posts/1');
  console.log(result.data); // 실제 데이터
}

fetchPost2();
