import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { hash, compareSync } from 'bcrypt';
import { SignUpDto } from './dto/user-signup.dto';
import { SignInDto } from './dto/user-signin.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signup(signupDto: SignUpDto): Promise<User> {
    const userExist = await this.findUserByEmail(signupDto.email);

    if (userExist) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    signupDto.password = await hash(signupDto.password, 10);
    let user = await this.usersRepository.create(signupDto);
    user.refreshToken = 'refresh_token_string';
    user = await this.usersRepository.save(user);
    delete user.password;
    return user;
  }

  async signin(signinDto: SignInDto) {
    const user = await this.usersRepository.findOne({
      where: { email: signinDto.email },
    });

    if (!user) {
      throw new HttpException('Email does not exist', HttpStatus.UNAUTHORIZED);
    }
    const comparePassword = compareSync(signinDto.password, user.password);
    if (!comparePassword) {
      throw new HttpException(
        'Password is not correct',
        HttpStatus.UNAUTHORIZED,
      );
    }

    return this.generateToken(user.id, user.email);
  }

  async refreshToken(refreshToken: string) {
    try {
      const verify = await this.jwtService.verifyAsync(refreshToken, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });
      const checkExistToken = await this.usersRepository.findOneBy({
        email: verify.email,
        refreshToken,
      });
      if (!checkExistToken) {
        throw new HttpException(
          'Refresh token is not valid',
          HttpStatus.BAD_REQUEST,
        );
      }
      return await this.generateToken(verify.id, verify.email);
    } catch (err) {
      throw new HttpException(
        'Refresh token is not valid',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private async generateToken(id: string, email: string) {
    const accessToken = await this.jwtService.signAsync({ id, email });
    const refreshToken = await this.jwtService.signAsync(
      { id, email },
      {
        secret: this.configService.get<string>('JWT_SECRET'),
        expiresIn: this.configService.get<string>('EXP_IN_REFRESH_TOKEN'),
      },
    );

    await this.usersRepository.update(
      {
        email: email,
      },
      { refreshToken: refreshToken },
    );

    return { accessToken, refreshToken };
  }

  async findUserByEmail(email: string) {
    return await this.usersRepository.findOne({ where: { email: email } });
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find({
      select: [
        'id',
        'username',
        'email',
        'createdAt',
        'updatedAt',
        'active',
        'isDeleted',
        'role',
      ],
    });
  }
}
