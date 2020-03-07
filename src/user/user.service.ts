import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { isEmail } from 'validator';

import { User } from './user.entity';
import { UserCreateDto, UserUpdateDto } from './user.dto';
import * as UserException from './user.exception';
import { hashPassword } from 'src/auth/auth.utils';

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
    const userExists = !!(await this.userRepository.findOne({
      where: [{ username }, { email }],
    }));
    if (userExists) {
      throw new UserException.UserExistsException();
    }

    const password = await hashPassword(dto.password);
    try {
      await this.userRepository.save({ ...dto, password });
    } catch (err) {
      return new UserException.CannotCreateUserException();
    }
  }

  async availableUsername(username: string) {
    const usernameExists = !!(await this.userRepository.findOne({ username }));
    if (usernameExists) throw new UserException.UsernameExistsException();
  }

  async availableEmail(email: string) {
    const emailExists = !!(await this.userRepository.findOne({ email }));
    if (emailExists) throw new UserException.EmailExistsException();
  }

  update(id: number, dto: UserUpdateDto) {
    return this.userRepository.update(id, dto);
  }

  async delete(id: number) {
    try {
      await this.userRepository.delete(id);
    } catch (err) {
      return err;
    }
  }
}
