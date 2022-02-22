import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  setRefreshToken({ user, res }) {
    const refreshToken = this.jwtService.sign(
      { email: user.email, sub: user.id },
      { secret: 'myRefreshKey', expiresIn: '2w' },
    );

    res.setHeader('Set-Cookie', `refreshToken=${refreshToken}; path=/;`);
  }

  getAccessToken({ user }) {
    return this.jwtService.sign(
      { email: user.email, sub: user.id },
      { secret: 'myKey', expiresIn: '1h' },
    );
  }

  async snsLogin(req, res) {
    let user = await this.userService.findOneEmail({ email: req.user.email });

    if (!user) {
      const createUserInput = req.user;
      user = await this.userService.create({ createUserInput });
    }

    this.setRefreshToken({ user, res });
    res.redirect(
      'http://localhost:5500/main-project/frontend/login/index.html',
    );
  }
}
