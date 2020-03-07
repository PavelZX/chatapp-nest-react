import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserUpdateDto implements Readonly<UserUpdateDto> {
  @ApiProperty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsString()
  lastName: string;
}
