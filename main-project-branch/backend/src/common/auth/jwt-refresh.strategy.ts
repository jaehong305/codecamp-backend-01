import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor() {
    super({
      jwtFromRequest: (req) => {
        const cookie = req.headers.cookie;
        return cookie.replace('refreshToken=', '');
      },
      secretOrKey: 'myRefreshKey',
    });
  }

  validate(payload) {
    return {
      id: payload.sub,
      email: payload.email,
    };
  }
}
