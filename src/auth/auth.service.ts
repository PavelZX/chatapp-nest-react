import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async login(user: any) {
    const { email, username } = user;
    return this.jwtService.sign({ username, email, sub: user.id });
  }
}
