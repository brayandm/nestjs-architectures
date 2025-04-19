import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

interface JwtPayload {
  sub: string;
  email: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    // eslint-disable-next-line
    super({
      // eslint-disable-next-line
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET || 'super-secret-key',
    });
  }

  // eslint-disable-next-line
  async validate(
    payload: JwtPayload,
  ): Promise<{ userId: string; email: string }> {
    return {
      userId: payload.sub,
      email: payload.email,
    };
  }
}
