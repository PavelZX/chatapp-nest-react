import {
  Get,
  Post,
  Put,
  Delete,
  Body,
  Controller,
  ClassSerializerInterceptor,
  UseInterceptors,
  Param,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { UserCreateDto } from './user.dto';
import { UserService } from './user.service';
import { UserUpdateDto } from './user.dto/user.update.dto';

@ApiTags('user')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('api/v1/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() dto: UserCreateDto) {
    return this.userService.create(dto);
  }

  @Get()
  find() {
    console.log('get');
    return this.userService.findAll();
  }

  @Put('/:id')
  update(@Param('id') id: number, dto: UserUpdateDto) {
    return this.userService.update(id, dto);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id') id: number) {
    this.userService.delete(id);
  }

  @Get('/available')
  available(@Query() query) {
    if (query.username) {
      return this.userService.availableUsername(query.username);
    }
    if (query.email) {
      return this.userService.availableEmail(query.email);
    }
  }
}
