import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { Payment } from './entities/payment.entity';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,

    private readonly connection: Connection,
  ) {}

  async findAll() {
    const queryRunner = await this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction('READ COMMITTED'); // Non-Repeatable-Read => 한 트랜잭션에서 반복된 조회시 커밋된 데이터들의 조회값이 다르게 나옴.
    try {
      // 하나의 트랜잭션 내에서 500원이 조회됐으면,
      // 해당트랜잭션이 끝나기 전까지는(커밋 전까지는) 다시 조회하더라도 항상 500원이 조회(Repeatable-Read) 되어야 함.
      // 1초간 반복해서 조회하는 중에, 누군가 등록하면(create), Repeatable-Read가 보장되지 않음 => Non-Repeatable-Read 문제!!!
      setInterval(async () => {
        const payment = await queryRunner.manager.find(Payment);
        console.log(payment);
      }, 1000);

      // await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      //await queryRunner.release();
    }
  }

  async create({ amount }) {
    const queryRunner = await this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction('READ COMMITTED');
    try {
      // 중간에 돈 추가해보기
      const payment = await this.paymentRepository.create({ amount });
      await queryRunner.manager.save(payment);
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      //await queryRunner.release();
    }
  }
}
