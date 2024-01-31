import { Controller, Post, Body, Get, UseGuards, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { SignUpDto } from './dto/user-signup.dto';
import { SignInDto } from './dto/user-signin.dto';
import { User } from './entities/user.entity';
import { AuthGuard } from '../guards/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  async signup(@Body() signupDto: SignUpDto) {
    return await this.usersService.signup(signupDto);
  }
  @Post('signin')
  async login(@Body() signinDto: SignInDto) {
    return await this.usersService.signin(signinDto);
  }

  @Post('refreshToken')
  async refreshToken(@Body('refreshToken') refreshToken: string) {
    return await this.usersService.refreshToken(refreshToken);
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll(): Promise<User[]> {
    return await this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    return await this.usersService.findOne(id);
  }
}
