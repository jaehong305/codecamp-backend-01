import {
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Mutation(() => String)
  async login(
    @Args('email') email: string, //
    @Args('password') password: string,
    @Context() context: any, // req,res 가지고있음.
  ) {
    // 로그인
    // 1. 이메일과 비밀번호가 맞는 유저 찾기
    const user = await this.userService.findOne({ email });
    if (!user) throw new UnprocessableEntityException('없는 이메일입니다.');

    // user.password => 해시된 비밀번호
    const isAuthenticated = await bcrypt.compare(password, user.password);
    if (!isAuthenticated)
      throw new UnauthorizedException('비밀번호가 틀렸습니다.');

    console.log('req', context.req);
    console.log('res', context.res);

    // 2. refreshToken(JWT)을 만들어서 프론트엔드(쿠키)에 보내주기
    this.authService.setRefreshToken({ user, res: context.res });

    // 3. accessToken(JWT)을 만들어서 프론트엔드에 보내주기
    return this.authService.getAccessToken({ user });
  }
}
