let List = [
  { number: 1, title: '장미', price: 4000 },
  { number: 2, title: '식칼', price: 7000 },
  { number: 3, title: '슬리퍼', price: 12000 },
  { number: 4, title: '주전자', price: 5000 },
  { number: 5, title: '선풍기', price: 5700 },
  { number: 6, title: '마우스 패드', price: 1800 },
  { number: 7, title: '휴대폰 케이스', price: 5500 },
  { number: 8, title: '마우스', price: 6500 },
];

List = List.sort((p, c) => p.price - c.price);

console.log(List);
// [
// 	{number: 6, title: "마우스 패드", price: 1800}
// 	{number: 1, title: "장미", price: 4000}
// 	{number: 4, title: "주전자", price: 5000}
// 	{number: 7, title: "휴대폰 케이스", price: 5500}
// 	{number: 5, title: "선풍기", price: 5700}
// 	{number: 8, title: "마우스", price: 6500}
// 	{number: 2, title: "식칼", price: 7000}
//   {number: 3, title: "슬리퍼", price: 12000}
// ]
