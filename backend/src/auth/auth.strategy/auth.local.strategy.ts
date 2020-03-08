import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy } from 'passport-local';

import { PassportStrategy } from '@nestjs/passport';

import { hashPassword } from '../auth.utils';
import { UserService } from '../../user/user.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super();
  }

  async validate(identity: string, password: string) {
    const user = await this.userService.findOne(identity);
    password = await hashPassword(password);
    if (user && user.password == password) {
      return user;
    }
    throw new UnauthorizedException();
  }
}
