import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(Strategy, 'access') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // 2. 넘겨받은 req에서 헤더의 토큰을 추출한 후 부모생성자함수 실행으로 검증한다.
      secretOrKey: 'myAccessKey1234', // 시크릿키가 같아야 검증이 가능하다.
    });
  }

  // 검증 성공시 실행(데이터 받음)
  validate(payload) {
    // 3. return 값이 req.user 로 들어간다.
    return {
      id: payload.sub,
      email: payload.email,
    };
  }
}
