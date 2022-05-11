import { ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

// graphql이 막고있어 헤더정보 받아오기
// 1. AuthGuard를 상속받아 getRequest함수 재정의 => Graphql에 맞는 context를 만들어 안의 req를 넘겨준다.
export class GqlAuthAccessGuard extends AuthGuard('access') {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}
