import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

interface JwtPayload {
  sub: string;
  email: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy<Strategy, JwtPayload>('jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET || 'super-secret-key',
    });
  }

  validate(payload: JwtPayload): Promise<{ userId: string; email: string }> {
    return Promise.resolve({
      userId: payload.sub,
      email: payload.email,
    });
  }
}
