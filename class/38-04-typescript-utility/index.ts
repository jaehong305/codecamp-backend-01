interface IProfile {
  name: string;
  age: 13;
  school: string;
  hobby?: string;
}

// interface는 선언병합이 가능하다 같은 이름의 interface가 합쳐짐
// interface IProfile {
//   aaa: string;
// }

// utility 타입 (재사용성 증가)
// 1. Partial 타입 => 모두 옵셔널로 변경
type Mytype1 = Partial<IProfile>;

// 2. Required 타입 => 모두 필수로 변경
type Mytype2 = Required<IProfile>;

// 3. Pick 타입 => 일부만 뽑아내기
type Mytype3 = Pick<IProfile, "name" | "age">;

// 4. Omit 타입 => 일부만 제외하고 뽑아내기
type Mytype4 = Omit<IProfile, "school">;

// 5. Record 타입 => ZZZ를 key로 IProfile을 value로(타입)
type ZZZ = "aaa" | "qqq" | "rrr";
type Mytype6 = Record<ZZZ, IProfile>;
