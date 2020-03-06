import { Controller, UseGuards, Post, Request } from '@nestjs/common';

import { AuthService } from './auth.service';
import { LocalAuthGuard } from './auth.guard';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
