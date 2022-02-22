import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor() {
    super({
      jwtFromRequest: (req) => {
        const cookies = req.headers.cookies;
        return cookies.replace('refreshToken=', '');
      },
      secretOrKey: process.env.REFRESH_TOKEN_KEY,
    });
  }

  // 검증 성공시 실행(데이터 받음)
  validate(payload) {
    // return 값이 req.user 로 들어간다.
    return {
      id: payload.sub,
      email: payload.email,
    };
  }
}
