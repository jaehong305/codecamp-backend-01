import {
  ConflictException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
  ) {}

  async checkDuplicate({ impUid }) {
    const result = await this.pointTransactionRepository.findOne({ impUid });
    if (result) throw new ConflictException('이미 결제된 아이디입니다.');
  }

  async checkAlreadyCanceled({ impUid }) {
    const pointTansaction = await this.pointTransactionRepository.findOne({
      impUid,
      status: POINT_TRANSACTION_STATUS_ENUM.CANCEL,
    });
    if (pointTansaction)
      throw new ConflictException('이미 취소된 결제 아이디입니다.');
  }

  async checkHasCancelablePoint({ impUid, currentUser }) {
    const pointTransaction = await this.pointTransactionRepository.findOne({
      impUid,
      user: { id: currentUser.id },
      status: POINT_TRANSACTION_STATUS_ENUM.PAYMENT,
    });
    if (!pointTransaction)
      throw new UnprocessableEntityException('결제 기록이 존재하지 않습니다.');

    const user = await this.userRepository.findOne({ id: currentUser });
    if (user.point < pointTransaction.amount)
      throw new UnprocessableEntityException('포인트가 부족합니다');
  }

  async cancel({ impUid, amount, currentUser }) {
    return await this.create({
      impUid,
      amount: -amount,
      currentUser,
      status: POINT_TRANSACTION_STATUS_ENUM.CANCEL,
    });
  }

  async create({
    impUid,
    amount,
    currentUser,
    status = POINT_TRANSACTION_STATUS_ENUM.PAYMENT,
  }) {
    // 1. pointTransaction 테이블에 거래기록 생성
    const pointTansaction = await this.pointTransactionRepository.create({
      impUid,
      amount,
      user: currentUser,
      status,
    });
    await this.pointTransactionRepository.save(pointTansaction);

    // 2. 유저정보를 조회
    const user = await this.userRepository.findOne({ id: currentUser.id });

    // 3. 유저의 돈 업데이트
    await this.userRepository.update(
      { id: user.id },
      { point: user.point + amount },
    );

    // 4. 최종결과 돌려주기
    return pointTansaction;
  }
}
