import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import {
  PointTransaction,
  POINT_TRANSACTION_STATUS_ENUM,
} from './entities/pointTransaction.entity';

@Injectable()
export class PointTransactionService {
  constructor(
    @InjectRepository(PointTransaction)
    private readonly pointTransactionRepository: Repository<PointTransaction>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly connection: Connection,
  ) {}

  async create({ impUid, amount, currentUser }) {
    const queryRunner = await this.connection.createQueryRunner(); // this.connection.createQueryBuilder() : 복잡한 처리 sql문 작성가능
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      // 1. pointTransaction 테이블에 거래기록 생성
      const pointTansaction = await this.pointTransactionRepository.create({
        impUid,
        amount,
        user: currentUser,
        status: POINT_TRANSACTION_STATUS_ENUM.PAYMENT,
      });
      // await this.pointTransactionRepository.save(pointTansaction);
      await queryRunner.manager.save(pointTansaction);

      // throw new Error();

      // 2. 유저정보를 조회
      const user = await this.userRepository.findOne({ id: currentUser.id });

      // 3. 유저의 돈 업데이트
      // await this.userRepository.update(
      //   { id: user.id },
      //   { point: user.point + amount },
      // );
      // 유저 객체 생성
      const updatedUser = this.userRepository.create({
        ...user,
        point: user.point + amount,
      });
      await queryRunner.manager.save(updatedUser);
      await queryRunner.commitTransaction();

      // 4. 최종결과 돌려주기
      return pointTansaction;
    } catch (error) {
      await queryRunner.rollbackTransaction(); // 임시저장 하나라도 실패시 트랜잭션 전체 롤백.
    } finally {
      await queryRunner.release(); // 접속(커넥트) 종료
    }
  }
}
