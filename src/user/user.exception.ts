import { HttpException, HttpStatus } from '@nestjs/common';

export class EmailExistsException extends HttpException {
  constructor() {
    super('Email already exists', HttpStatus.CONFLICT);
  }
}

export class UsernameExistsException extends HttpException {
  constructor() {
    super('Username already exists', HttpStatus.CONFLICT);
  }
}

export class UserExistsException extends HttpException {
  constructor() {
    super('User already exists', HttpStatus.CONFLICT);
  }
}

export class UserNotFoundException extends HttpException {
  constructor() {
    super('User not found', HttpStatus.NOT_FOUND);
  }
}
