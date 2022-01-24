import axios from 'axios';
import cheerio from 'cheerio';

export async function getOpenGraph(myprefer) {
  const html = await axios.get(myprefer);
  const $ = cheerio.load(html.data);
  const og = {};
  $('meta').each((_, el) => {
    const key = $(el).attr('property')?.split(':')[1]; // ? 옵셔널 체이닝 앞에가 있으면 실행
    if (key) {
      const value = $(el).attr('content');
      og[key] = value;
    }
  });
  return og;
}
