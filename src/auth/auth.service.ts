import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async login(user: any) {
    const { password, ...payload } = user;
    return this.jwtService.sign({ ...payload, sub: user.id });
  }
}
