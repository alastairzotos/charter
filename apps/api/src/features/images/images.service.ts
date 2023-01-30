import { Injectable } from "@nestjs/common";
import { v4 as uuidv4 } from 'uuid';
import { S3Service } from "../../integrations/s3/s3.service";
import { EnvService } from "../../environment/environment.service";

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
