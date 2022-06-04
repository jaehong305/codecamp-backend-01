import { ConflictException, UnauthorizedException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { UserService } from '../user.service';

class MockUserRepository {
  mydb = [
    {
      email: 'a@a.com',
      password: '0000',
      name: '짱구',
      age: 8,
    },
  ];

  findOne({ email }) {
    const users = this.mydb.filter((el) => el.email === email);
    return users.length ? users[0] : null;
  }

  save({ email, password, name, age }) {
    this.mydb.push({ email, password, name, age });
    return {
      email,
      password,
      name,
      age,
    };
  }
}

// interface Iprofile {
//   name: '철수';
//   age: 13;
// }
// // keyof는 키들만 뽑아낸다. // 두개가 같은 의미
// const qqq: keyof Iprofile = 'name';
// const www: 'name' | 'age' = 'age';

// 제너릭으로 들어올때 타입정해짐, 원본 Repository타입에서 키만 뽑아냄, 뽑아낸 각각을 키값 타입으로해서 해당타입을 value(가짜밸류)값 타입으로 붙여주고, 모두 옵셔널로 바꿈.
type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>; // 가찌 타입생성

describe('UserService', () => {
  let userService: UserService;
  let userRepository: MockRepository<User>;

  beforeEach(async () => {
    const userModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useClass: MockUserRepository, // 나만의 UserRepository 주입하기
        },
      ],
    }).compile();

    userService = userModule.get<UserService>(UserService);
    userRepository = userModule.get<MockRepository<User>>(
      getRepositoryToken(User),
    );
  });

  describe('create', () => {
    it('이미 존재하는 이메일 검증하기!!', async () => {
      const userRepositorySpyFindOne = jest.spyOn(userRepository, 'findOne'); // 몇번실행했는지 스파이가 추적
      const userRepositorySpySave = jest.spyOn(userRepository, 'save');

      const myData = {
        email: 'a@a.com',
        password: '1234',
        name: '철수',
        age: 13,
      };
      try {
        await userService.create({ ...myData });
      } catch (error) {
        expect(error).toBeInstanceOf(ConflictException);
        // expect(error).toBeInstanceOf(UnauthorizedException);
      }

      expect(userRepositorySpyFindOne).toBeCalledTimes(1);
      expect(userRepositorySpySave).toBeCalledTimes(0);
    });

    it('회원등록 잘됐는지 검증!!', async () => {
      const userRepositorySpyFindOne = jest.spyOn(userRepository, 'findOne');
      const userRepositorySpySave = jest.spyOn(userRepository, 'save');

      const myData = {
        email: 'bbb@bbb.com',
        password: '1234',
        name: '철수',
        age: 13,
      };
      const result = await userService.create({ ...myData });
      expect(result).toStrictEqual(myData);

      // 1번씩 실행이 기대됨
      expect(userRepositorySpyFindOne).toBeCalledTimes(1);
      expect(userRepositorySpySave).toBeCalledTimes(1);
    });
  });

  // describe('getHello', () => {
  //   it('이 테스트의 결과는 Hello World를 리턴해야됨!!!', () => {
  //     const result = appController.getHello();
  //     expect(result).toBe('Hello World!');
  //   });
  // });
});
