import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidTokenException extends HttpException {
  constructor() {
    super('Unauthorized access', HttpStatus.UNAUTHORIZED);
  }
}

export class UsernameNotFoundException extends HttpException {
  constructor() {
    super('Username not found', HttpStatus.UNAUTHORIZED);
  }
}

export class EmailNotFoundException extends HttpException {
  constructor() {
    super('Email not found', HttpStatus.UNAUTHORIZED);
  }
}
