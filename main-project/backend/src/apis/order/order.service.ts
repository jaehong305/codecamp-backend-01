import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../product/entities/product.entity';
import { User } from '../user/entities/user.entity';
import { Order } from './entities/order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}
  async create({ createOrderInput }) {
    const { userId, productId, ...rest } = createOrderInput;
    const user = await this.userRepository.findOne({ id: userId });
    const product = await this.productRepository.findOne({ id: productId });
    return await this.orderRepository.save({
      user,
      product,
      ...rest,
    });
  }

  async findOne({ orderId }) {
    return await this.orderRepository.findOne({ id: orderId });
  }
}
