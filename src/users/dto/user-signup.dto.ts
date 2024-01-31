import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class SignUpDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Name can not be empty' })
  @IsString({ message: 'Name should be string' })
  username?: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Email can not be empty' })
  @IsEmail({}, { message: 'Please provide a valid email' })
  email?: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Password can not be empty' })
  @MinLength(5, { message: 'Password minimum character should be 5' })
  password?: string;
}
