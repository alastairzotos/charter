import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { ImagesService } from 'features/images/images.service';
import { SentryInterceptor } from 'interceptors/sentry.interceptor';

@Controller('images')
@UseInterceptors(SentryInterceptor)
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadPhoto(@UploadedFile() file: Express.Multer.File) {
    return await this.imagesService.uploadImage(file.buffer);
  }
}
