import {
  Body,
  Controller,
  Post,
  Get,
  Query,
  UseGuards,
  Param,
  Put,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';

import { CreatePostDto } from './dto/create-post.dto';
import { PostService } from './post.service';
import { FilterPostDto } from './dto/filter-post.dto';
import { Post as PostEntity } from './entities/post.entity';
import { UpdatePostDto } from './dto/update-post.dto';
import { AuthGuard } from '../guards/auth.guard';
import { User } from '../decorators/user-decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileFilterConfig, storageConfig } from '../images/multer';

@Controller('posts')
export class PostController {
  constructor(private postService: PostService) {}

  @UseGuards(AuthGuard)
  @Post()
  @UseInterceptors(
    FileInterceptor('thumbnail', {
      storage: storageConfig(),
      fileFilter: fileFilterConfig,
    }),
  )
  create(
    @UploadedFile() file: Express.Multer.File,
    @User() user: any,
    @Body() createPostDto: CreatePostDto,
  ) {
    return this.postService.create(user, file, createPostDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll(@Query() query: FilterPostDto): Promise<any> {
    return this.postService.findAll(query);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findDetail(@Param('id') id: string): Promise<PostEntity> {
    return this.postService.findDetail(id);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  @UseInterceptors(
    FileInterceptor('thumbnail', {
      storage: storageConfig(),
      fileFilter: fileFilterConfig,
    }),
  )
  update(
    @Param('id') id: string,
    @User() user: any,
    @Body() updatePostDto: UpdatePostDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.postService.update(id, user, updatePostDto, file);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.postService.delete(id);
  }
}
