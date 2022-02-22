import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IamportService } from '../iamport/iamport.service';
import { Order } from '../order/entities/order.entity';
import { OrderService } from '../order/order.service';
import { Product } from '../product/entities/product.entity';
import { User } from '../user/entities/user.entity';
import { Payment } from './entities/payment.entity';
import { PaymentResolver } from './payment.resolver';
import { PaymentService } from './payment.service';

@Module({
  imports: [TypeOrmModule.forFeature([Payment, Order, User, Product])],
  providers: [PaymentResolver, PaymentService, OrderService, IamportService],
})
export class PaymentModule {}
