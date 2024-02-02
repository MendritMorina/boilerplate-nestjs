import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ImagesService } from '../images/images.service';
import { Image } from '../images/entities/image.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Post, Image]), ConfigModule],
  controllers: [PostController],
  providers: [PostService, JwtService, ConfigService, ImagesService],
})
export class PostModule {}
