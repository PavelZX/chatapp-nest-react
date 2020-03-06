import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { isEmail } from 'validator';

import { User } from './user.entity';
import { UserCreateDto, UserUpdateDto } from './user.dto';
import * as UserException from './user.exception';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  findAll() {
    return this.userRepository.find();
  }

  findOne(identity: string) {
    if (isEmail(identity)) {
      return this.userRepository.findOne({ email: identity });
    }
    return this.userRepository.findOne({ username: identity });
  }

  async create(dto: UserCreateDto) {
    const { username, email } = dto;
    const userExists = !!(await this.userRepository.count({
      where: [{ username }, { email }],
    }));
    if (userExists) {
      throw new UserException.UserExistsException();
    }
  }

  async usernameExists(username: string) {
    const usernameExists = !!(await this.userRepository.count({ username }));
    if (usernameExists) throw new UserException.UsernameExistsException();
  }

  async emailExists(email: string) {
    const emailExists = !!(await this.userRepository.count({ email }));
    if (emailExists) throw new UserException.EmailExistsException();
  }

  update(id: number, dto: UserUpdateDto) {
    return this.userRepository.update(id, dto);
  }

  delete(id: number) {
    return this.userRepository.delete(id);
  }
}
