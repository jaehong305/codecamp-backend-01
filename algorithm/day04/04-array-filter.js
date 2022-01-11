let movies = [
  { title: '킹스맨', genre: '액션', 상영관: '메가박스' },
  { title: '러브레터', genre: '로맨스', 상영관: 'cgv' },
  { title: '스폰지밥', genre: '코미디', 상영관: '메가박스' },
  { title: '노트북', genre: '드라마', 상영관: 'cgv' },
  { title: '임파서블', genre: '액션', 상영관: 'cgv' },
  { title: '파리의 인어', genre: '로맨스', 상영관: '메가박스' },
  { title: '심슨', genre: '코미디', 상영관: '메가박스' },
  { title: '포레스트 검프', genre: '드라마', 상영관: 'cgv' },
];

let action;
let cgv;
let romance;

let action = movies.filter(data => data.genre === '액션');
let cgv = movies.filter(data => data.상영관 === 'cgv');
let romance = movies.filter(data => data.상영관 === 'cgv' && data.genre === '로맨스');

console.log(action);
// [
//  { title: "킹스맨", genre: "액션", 상영관: "메가박스" },
//  { title: "임파서블", genre: "액션", 상영관: "cgv" },
// ]
// console.log(cgv)
// [
//  { title: "러브레터", genre: "로맨스", 상영관: "cgv" },
//  { title: "노트북", genre: "드라마", 상영관: "cgv" },
//  { title: "임파서블", genre: "액션", 상영관: "cgv" },
//  { title: "포레스트 검프", genre: "드라마", 상영관: "cgv" },
// ]
// console.log(romance)
// [
//  { title: "러브레터", genre: "로맨스", 상영관: "cgv" },
// ]
