import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Like, Repository } from 'typeorm';
import { FilterPostDto } from './dto/filter-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ImagesService } from '../images/images.service';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>,
    private imagesService: ImagesService,
  ) {}
  async create(user: any, file, createPostDto: CreatePostDto): Promise<Post> {
    const post = new Post();
    post.thumbnail = await this.imagesService.uploadImage(file);
    post.title = createPostDto.title;
    post.user = user.id;
    post.description = createPostDto.description;
    post.status = createPostDto.status;

    return await this.postRepository.save(post);
  }

  async findAll(query: FilterPostDto): Promise<any> {
    const items_per_page = Number(query.items_per_page) || 10;
    const page = Number(query.page) || 1;
    const search = query.search || '';

    const skip = (page - 1) * items_per_page;
    const [res, total] = await this.postRepository.findAndCount({
      where: [
        {
          title: Like('%' + search + '%'),
        },
        {
          description: Like('%' + search + '%'),
        },
      ],
      order: { createdAt: 'DESC' },
      take: items_per_page,
      skip: skip,
      relations: {
        user: true,
      },
      select: {
        user: {
          id: true,
          username: true,
          email: true,
        },
      },
    });

    const lastPage = Math.ceil(total / items_per_page);
    const nextPage = page + 1 > lastPage ? null : page + 1;
    const prevPage = page - 1 < 1 ? null : page - 1;

    return {
      data: res,
      total,
      currentPage: page,
      nextPage,
      prevPage,
      lastPage,
    };
  }

  async findDetail(id: string): Promise<Post> {
    return await this.postRepository.findOne({
      where: { id: id },
      relations: { user: true },
      select: {
        user: {
          id: true,
          username: true,
          email: true,
        },
      },
    });
  }

  async update(
    id: string,
    user: any,
    updatePostDto: UpdatePostDto,
    file,
  ): Promise<Post> {
    const post = await this.postRepository.findOne({
      where: { id: id },
      relations: { user: true, thumbnail: true },
    });

    post.user = user.id;
    if (post.thumbnail) {
      post.thumbnail = await this.imagesService.updateImage(
        file,
        post.thumbnail.id,
      );
    } else {
      post.thumbnail = await this.imagesService.uploadImage(file);
    }
    post.description = updatePostDto.description;
    post.title = updatePostDto.title;
    post.status = updatePostDto.status;
    post.updatedAt = new Date();

    return this.postRepository.save(post);
  }

  async delete(id: string): Promise<DeleteResult> {
    return await this.postRepository.delete(id);
  }
}
