import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Image } from './entities/image.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as fs from 'fs';
import * as path from 'path';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ImagesService {
  private readonly baseUrl = this.configService.get<string>('UPLOAD_IMAGE');
  private readonly publicDirPath = path.join(
    __dirname,
    '..',
    '..',
    '..',
    'public',
  );
  constructor(
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
    private configService: ConfigService,
  ) {}

  async uploadImage(file: Express.Multer.File): Promise<Image> {
    const newImage = new Image();
    Object.assign(newImage, {
      url: `${this.baseUrl}public/${file.filename}`,
      name: file.originalname,
      mimeType: file.mimetype,
      size: file.size,
      filename: file.filename,
    });

    return this.imageRepository.save(newImage);
  }

  async getImages(): Promise<Image[]> {
    return this.imageRepository.find({ order: { createdAt: 'DESC' } });
  }

  async updateImage(file: Express.Multer.File, id: string): Promise<Image> {
    const image = await this.imageRepository.findOne({
      where: { id: id },
    });
    if (!image) {
      throw new HttpException(
        `Image with ID ${id} not found.`,
        HttpStatus.NOT_FOUND,
      );
    }

    if (file) {
      //Update in folder
      const oldFilePath = path.join(this.publicDirPath, image.filename);
      if (fs.existsSync(oldFilePath)) {
        fs.unlinkSync(oldFilePath);
      }

      //Update in database
      await this.imageRepository.update(id, {
        id: id,
        url: `${this.baseUrl}public/${file.filename}`,
        name: file.originalname,
        mimeType: file.mimetype,
        size: file.size,
        filename: file.filename,
      });
    } else {
      image.updatedAt = new Date();
      await this.imageRepository.save(image);
    }
    return image;
  }

  async deleteImage(id: string): Promise<void> {
    const image = await this.imageRepository.findOne({
      where: { id: id },
    });
    if (!image) {
      throw new HttpException(
        `Image with ID ${id} not found.`,
        HttpStatus.NOT_FOUND,
      );
    }

    //Delete from database
    await this.imageRepository.delete(id);

    //Delete from folder
    const filePath = path.join(this.publicDirPath, image.filename);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }
}
