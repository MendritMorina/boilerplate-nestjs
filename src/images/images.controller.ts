import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImagesService } from './images.service';
import { fileFilterConfig, storageConfig } from './multer';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: storageConfig(),
      fileFilter: fileFilterConfig,
    }),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return await this.imagesService.uploadImage(file);
  }

  @Get()
  async getImages() {
    return await this.imagesService.getImages();
  }

  @Put(':id')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: storageConfig(),
      fileFilter: fileFilterConfig,
    }),
  )
  async updateFile(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: string,
  ) {
    return await this.imagesService.updateImage(file, id);
  }

  @Delete(':id')
  async deleteFile(@Param('id') id: string) {
    return await this.imagesService.deleteImage(id);
  }
}
