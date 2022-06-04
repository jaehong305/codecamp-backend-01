import { ConflictException, UnauthorizedException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
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
    // const email = this.mydb.find(el => el.email === email)
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

describe('UserService', () => {
  let userService: UserService;

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
  });

  describe('create', () => {
    it('이미 존재하는 이메일 검증하기!!', async () => {
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
    });

    it('회원등록 잘됐는지 검증!!', async () => {
      const myData = {
        email: 'bbb@bbb.com',
        password: '1234',
        name: '철수',
        age: 13,
      };
      const result = await userService.create({ ...myData });
      expect(result).toStrictEqual(myData); // 객체비교
    });
  });

  // describe('getHello', () => {
  //   it('이 테스트의 결과는 Hello World를 리턴해야됨!!!', () => {
  //     const result = appController.getHello();
  //     expect(result).toBe('Hello World!');
  //   });
  // });
});
