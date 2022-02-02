const myShopping = [
  { category: '과일', price: 12000 },
  { category: '의류', price: 10000 },
  { category: '의류', price: 20000 },
  { category: '장난감', price: 9000 },
  { category: '과일', price: 5000 },
  { category: '의류', price: 10000 },
  { category: '과일', price: 8000 },
  { category: '의류', price: 7000 },
  { category: '장난감', price: 5000 },
  { category: '의류', price: 10000 },
];

let money = 0;
const clothes = myShopping.filter(data => {
  if (data.category === '의류') {
    money = money + data.price;
  }
  return data.category === '의류';
});

let count = clothes.length;
let tier = '';

if (count >= 5) {
  tier = 'Gold';
} else if (count >= 3) {
  tier = 'Silver';
} else {
  tier = 'Bronze';
}

console.log(`의류를 구매한 횟수는 총 ${count}회 금액은 ${money}원이며 등급은 ${tier}입니다`);
// 의류를 구매한 횟수는 총 5회 금액은 57000원이며 등급은 Gold입니다.
