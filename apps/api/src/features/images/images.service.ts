import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { EnvService } from 'src/environment/environment.service';
import { S3Service } from 'src/integrations/s3/s3.service';

@Injectable()
export class ImagesService {
  constructor(
    private readonly s3Service: S3Service,
    private readonly env: EnvService,
  ) {}

  async uploadImage(buffer: Buffer) {
    const id = uuidv4();

    await this.s3Service.store(id, buffer);

    return `${this.env.get().awsCloudfrontDomain}${id}`;
  }
}
