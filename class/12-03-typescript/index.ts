// 문자타입 - 타입추론
let aaa = '안녕하세요';
aaa = '반갑습니다';
aaa = 3;

// 문자타입
let bbb: string = '반갑습니다';
bbb = '반가워요!!';
bbb = 123;

// 숫자타입
let ccc: number = 5;
ccc = '33';

// 불린타입
let ddd: boolean = true;
ddd = 11;
ddd = false;

// 배열타입
let eee: number[] = [1, 2, 3, 4, 5];
let fff: string[] = ['철수', '영희', '훈이'];
let ggg: (number | string)[] = [1, '철수', 2, '영희'];

let mymoney: number[] | string[] = [1000, 2000, 3000];
mymoney = ['1000원', '2000원', '3000원'];

// 객체타입
interface IProfile {
  name: string;
  age: number | string;
  school: string;
}

let profile: IProfile = {
  name: '철수',
  age: 13,
  school: '다람쥐초등학교',
};
profile.age = '13살';

// 함수타입
function qqq(a: number, b: number): number {
  return a + b;
}

let result = qqq(1, 2);

interface a {
  a: string;
  b?: string;
}

const aaaaa: a = {
  a: 'sss',
};
