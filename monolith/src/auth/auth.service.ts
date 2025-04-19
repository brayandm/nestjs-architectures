import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async register(data: RegisterDto): Promise<{ access_token: string }> {
    const hashed = (await bcrypt.hash(data.password, 10)) as string;

    const user: User = await this.prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        password: hashed,
      },
    });

    return this.generateToken(user);
  }

  async login(
    email: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user: User | null = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.generateToken(user);
  }

  private generateToken(user: User): { access_token: string } {
    const payload = { sub: user.id, email: user.email };
    return {
      access_token: this.jwt.sign(payload),
    };
  }
}
