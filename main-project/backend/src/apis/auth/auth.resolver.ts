import {
  UnauthorizedException,
  UnprocessableEntityException,
  UseGuards,
} from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { AuthService } from './auth.service';
import { CurrentUser, ICurrentUser } from 'src/common/auth/gql-user.param';
import { GqlAuthRefeshGuard } from 'src/common/auth/gql-auth.guard';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Mutation(() => String)
  async login(
    @Args('userId') userId: string, //
    @Args('password') password: string,
    @Context() context: any,
  ) {
    const user = await this.userService.findOne({ userId });
    if (!user)
      throw new UnprocessableEntityException('존재하지않는 회원입니다.');
    const isAuthenticated = await bcrypt.compare(password, user.password);
    if (!isAuthenticated)
      throw new UnauthorizedException('비밀번호가 틀렸습니다.');

    this.authService.setRefreshToken({ user, res: context.res });

    return this.authService.getAccessToken({ user });
  }

  @UseGuards(GqlAuthRefeshGuard)
  @Mutation(() => String)
  restoreAccessToken(@CurrentUser() currentUser: ICurrentUser) {
    return this.authService.getAccessToken({ user: currentUser });
  }
}
