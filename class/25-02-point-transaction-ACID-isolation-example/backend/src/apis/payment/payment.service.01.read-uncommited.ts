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

  async create({ amount }) {
    const queryRunner = await this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction('READ UNCOMMITTED'); // READ UNCOMMITTED => 가장 낮은 단계(Dirty-Read 등 발생): 롤백되기전에 잠깐의 저장된 상태가 조회가된다.
    try {
      const payment = await this.paymentRepository.create({ amount });
      await queryRunner.manager.save(payment);

      // 5초뒤에 특정 이유로 실패
      setTimeout(async () => {
        await queryRunner.rollbackTransaction();
      }, 5000);
      // await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      //await queryRunner.release();
    }
  }

  async findAll() {
    const queryRunner = await this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction('READ UNCOMMITTED');
    try {
      const payment = await queryRunner.manager.find(Payment);
      await queryRunner.commitTransaction();
      return payment;
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      //await queryRunner.release();
    }
  }
}
