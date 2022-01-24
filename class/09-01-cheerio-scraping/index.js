import axios from 'axios';
import cheerio from 'cheerio';

async function getOpenGraph(mydata) {
  const myaddress = mydata.contents.split(' ').filter(el => el.includes('http'));
  const html = await axios.get(myaddress[0]);
  const $ = cheerio.load(html.data);
  $('meta').each((_, el) => {
    const key = $(el).attr('property')?.split(':')[1]; // ? 옵셔널 체이닝 앞에가 있으면 실행
    if (key) {
      const value = $(el).attr('content');
      console.log(key, value);
    }
  });
}

const mydata = {
  title: '안녕',
  contents: '여기는 https://naver.com 입니다!',
};

getOpenGraph(mydata);
