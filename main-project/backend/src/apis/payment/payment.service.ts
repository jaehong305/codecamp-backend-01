import {
  ConflictException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { Order } from '../order/entities/order.entity';
import { Payment, PAYMENT_STATUS_ENUM } from './entities/payment.entity';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,

    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,

    private readonly connection: Connection,
  ) {}

  async checkAlreadyCanceled({ impUid }) {
    const payment = await this.paymentRepository.findOne({
      impUid,
      status: PAYMENT_STATUS_ENUM.CANCEL,
    });
    if (payment) throw new ConflictException('이미 취소된 결제 아이디입니다.');
  }

  async checkUser({ impUid, currentUser, orderId }) {
    const payment = await this.paymentRepository.findOne({
      impUid,
      status: PAYMENT_STATUS_ENUM.PAYMENT,
    });
    if (!payment)
      throw new UnprocessableEntityException('결제 기록이 존재하지 않습니다.');

    const order = await this.orderRepository.findOne({ id: orderId });
    if (order.user.id !== currentUser.id) {
      throw new UnprocessableEntityException(
        '자신의 주문만 취소가 가능합니다.',
      );
    }
  }

  async cancel({ impUid, amount, orderId }) {
    const queryRunner = await this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction('SERIALIZABLE');
    try {
      const order = await queryRunner.manager.findOne(
        Order,
        { id: orderId },
        { lock: { mode: 'pessimistic_write' } },
      );
      const cancelPayment = await this.paymentRepository.create({
        impUid,
        amount: -amount,
        order,
        status: PAYMENT_STATUS_ENUM.CANCEL,
      });
      await queryRunner.manager.save(cancelPayment);
      await queryRunner.commitTransaction();
      return cancelPayment;
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async create({
    impUid,
    amount,
    orderId,
    status = PAYMENT_STATUS_ENUM.PAYMENT,
  }) {
    const queryRunner = await this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction('SERIALIZABLE');
    try {
      const result = await queryRunner.manager.findOne(
        Payment,
        { impUid },
        { lock: { mode: 'pessimistic_write' } },
      );
      if (result) throw new ConflictException('이미 결제된 아이디입니다.');
      const order = await queryRunner.manager.findOne(
        Order,
        { id: orderId },
        { lock: { mode: 'pessimistic_write' } },
      );
      const payment = await this.paymentRepository.create({
        impUid,
        amount,
        order,
        status,
      });
      await queryRunner.manager.save(payment);
      await queryRunner.commitTransaction();
      return payment;
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
