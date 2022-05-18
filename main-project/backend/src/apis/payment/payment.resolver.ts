import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { GqlAuthAccessGuard } from 'src/common/auth/gql-auth.guard';
import { CurrentUser, ICurrentUser } from 'src/common/auth/gql-user.param';
import { IamportService } from '../iamport/iamport.service';
import { Payment } from './entities/payment.entity';
import { PaymentService } from './payment.service';

@Resolver()
export class PaymentResolver {
  constructor(
    private readonly paymentService: PaymentService,
    private readonly iamprotService: IamportService,
  ) {}

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Payment)
  async createPayment(
    @Args('impUid') impUid: string,
    @Args('amount') amount: number,
    @Args('orderId') orderId: string,
  ) {
    const accessToken = await this.iamprotService.getToken();
    await this.iamprotService.checkpaid({
      impUid,
      amount,
      accessToken,
    });

    // const result = await this.iamprotService.IamportAuthorization({
    //   impUid,
    //   amount,
    //   accessToken,
    // });
    // const paymentData = result.data.response;

    // const order = await this.orderService.findOne({
    //   // orderId: paymentData.merchant_uid,
    //   orderId,
    // });
    // if (order.sum !== paymentData.amount) {
    //   throw new UnprocessableEntityException('결제값 불일치');
    // }

    return await this.paymentService.create({
      impUid,
      amount,
      orderId,
    });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Payment)
  async cancelPayment(
    @Args('orderId') orderId: string,
    @Args('impUid') impUid: string,
    @CurrentUser() currentUser: ICurrentUser,
  ) {
    await this.paymentService.checkAlreadyCanceled({ impUid });
    await this.paymentService.checkUser({ impUid, currentUser, orderId });

    // const { impUid, amount } = payment;
    // const { merchant_uid } = result.data.response;
    // return await this.paymentService.createCancel({
    //   impUid,
    //   amount,
    //   orderId: merchant_uid,
    // });

    const accessToken = await this.iamprotService.getToken();
    const canceledAmount = await this.iamprotService.cancel({
      accessToken,
      impUid,
    });

    return await this.paymentService.cancel({
      impUid,
      amount: canceledAmount,
      orderId,
    });
  }
}
