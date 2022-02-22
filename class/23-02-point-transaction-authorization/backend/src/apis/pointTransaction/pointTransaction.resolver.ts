import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { GqlAuthAccessGuard } from 'src/common/auth/gql-auth.guard';
import { CurrentUser, ICurrentUser } from 'src/common/auth/gql-user.param';
import { IamportService } from '../iamport/iamport.service';
import {
  PointTransaction,
  POINT_TRANSACTION_STATUS_ENUM,
} from './entities/pointTransaction.entity';
import { PointTransactionService } from './pointTransaction.service';

@Resolver()
export class PointTransactionResolver {
  constructor(
    private readonly pointTransactionService: PointTransactionService,
    private readonly iamportService: IamportService,
  ) {}

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => PointTransaction)
  async createPointTransaction(
    @Args('impUid') impUid: string,
    @Args('amount') amount: number,
    @CurrentUser() currentUser: ICurrentUser,
  ) {
    // 검증없이 그냥 요청이 디비에 저장 안되게 체크
    // 1. 아임포트에 요청해서 결제 완료 기록이 존재하는지 확인
    const token = await this.iamportService.getToken();
    await this.iamportService.checkPaid({ impUid, amount, token });

    // 2. pointTransaction 테이블에는 impUid가 1번만 존재해야 한다. (중복결제체크)
    await this.pointTransactionService.checkDuplicate({ impUid });

    return await this.pointTransactionService.create({
      impUid,
      amount,
      currentUser,
    });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => PointTransaction)
  async cancelPointTransaction(
    @Args('impUid') impUid: string,
    @CurrentUser() currentUser: ICurrentUser,
  ) {
    // 검증 로직들
    // 1. 이미 취소된 건인지 확인
    await this.pointTransactionService.checkAlreadyCanceled({ impUid });

    // 2. 취소하기에 충분한 내 포인트 잔액이 남아있는지
    await this.pointTransactionService.checkHasCancelablePoint({
      impUid,
      currentUser,
    });

    // 3. 실제로 아임포트에 취소 요청하기
    const token = await this.iamportService.getToken();
    const canceledAmount = await this.iamportService.cancel({ impUid, token });

    // 4. pointTransaction 테이블에 결제 취소 등록
    return await this.pointTransactionService.cancel({
      impUid,
      amount: canceledAmount,
      currentUser,
    });
  }
}
