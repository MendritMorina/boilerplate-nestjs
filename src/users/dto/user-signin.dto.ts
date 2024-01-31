import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignInDto {
  @IsNotEmpty({ message: 'Name can not be empty' })
  @IsString({ message: 'Name should be string' })
  username?: string;

  @IsNotEmpty({ message: 'Email can not be empty' })
  @IsEmail({}, { message: 'Please provide a valid email' })
  email?: string;

  @IsNotEmpty({ message: 'Password can not be empty' })
  password?: string;
}
