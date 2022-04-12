import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlAuthAccessGuard } from '../../common/auth/gql-auth.guard';
import { CurrentUser, ICurrentUser } from '../../common/auth/gql-user.param';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  async createUser(
    @Args('email') email: string,
    @Args('password') password: string,
    @Args('name') name: string,
    @Args('age') age: number,
  ) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return await this.userService.create({ email, hashedPassword, name, age });
  }

  @UseGuards(GqlAuthAccessGuard) // 반드시 로그인 필요. AuthGuard('access')(이 데코레이터가 있는 함수는 안에 검증로직이 들어가 로그인했을 경우에만 실행할 수 있다.)
  @Query(() => String)
  // 본인 정보 불러오기
  fetchUser(@CurrentUser() currentUser: ICurrentUser) {
    console.log('=========');
    console.log(currentUser);
    console.log('=========');
    console.log('실행-----');
    return '실행완료!!!';
  }
}
