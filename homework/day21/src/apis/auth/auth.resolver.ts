import {
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
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
    @Args('userId') userId: string, //
    @Args('password') password: string,
  ) {
    const user = await this.userService.findOne({ userId });
    if (!user)
      throw new UnprocessableEntityException('존재하지않는 회원입니다.');
    const isAuthenticated = await bcrypt.compare(password, user.password);
    if (!isAuthenticated)
      throw new UnauthorizedException('비밀번호가 틀렸습니다.');

    return this.authService.getAccessToken({ user });
  }
}
