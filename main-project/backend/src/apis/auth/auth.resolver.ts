import {
  CACHE_MANAGER,
  Inject,
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
import * as jwt from 'jsonwebtoken';
import { Cache } from 'cache-manager';
import { getToday } from 'src/common/libraries/utils';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,

    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
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

  @UseGuards(GqlAuthRefeshGuard)
  @Mutation(() => String)
  async logout(@Context() context: any) {
    const accessToken = context.req.headers.authorization.split(' ')[1];
    const refreshToken = context.req.headers.cookie.replace(
      'refreshToken=',
      '',
    );

    try {
      // await jwt.verify(accessToken, 'myKey', async (err, payload) => {
      //   await this.cacheManager.set(
      //     `accessToken:${accessToken}`,
      //     'accessToken',
      //     { ttl: payload.exp - Date.parse(getToday()) / 1000 },
      //   );
      // });

      const accessPayload = jwt.verify(accessToken, 'myKey');
      const refreshPayload = jwt.verify(refreshToken, 'myRefreshKey');

      const now = Date.parse(getToday()) / 1000;
      await this.cacheManager.set(`accessToken:${accessToken}`, 'accessToken', {
        ttl: typeof accessPayload === 'object' ? accessPayload.exp - now : -1,
      });
      await this.cacheManager.set(
        `refreshToken:${refreshToken}`,
        'refreshToken',
        {
          ttl:
            typeof refreshPayload === 'object' ? refreshPayload.exp - now : -1,
        },
      );
    } catch (error) {
      if (error?.response?.data?.message) {
        throw new UnauthorizedException(
          error.response.data.message,
          error.response.status,
        );
      } else {
        throw error;
      }
    }

    return '로그아웃에 성공했습니다';
  }
}
