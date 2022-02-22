import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { GqlAuthAccessGuard } from 'src/common/auth/gql-auth.guard';
import { CreateOrderInput } from './dto/createOrder.Input';
import { Order } from './entities/order.entity';
import { OrderService } from './order.service';

@Resolver()
export class OrderResolver {
  constructor(private readonly orderService: OrderService) {}

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Order)
  async createOrder(
    @Args('createOrderInput') createOrderInput: CreateOrderInput,
  ) {
    return await this.orderService.create({ createOrderInput });
  }
}
