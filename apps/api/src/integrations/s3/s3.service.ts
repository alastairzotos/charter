import {
  PutObjectCommand,
  DeleteObjectCommand,
  S3Client as S3ClientAWS,
  S3ClientConfig,
} from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';

import { EnvService } from 'src/environment/environment.service';

@Injectable()
export class S3Service {
  private readonly s3Client: S3ClientAWS;
  private readonly bucketName: string;

  constructor(env: EnvService) {
    this.bucketName = env.get().awsS3BucketName;

    const s3Config: S3ClientConfig = {
      credentials: {
        accessKeyId: env.get().awsAccessKeyId,
        secretAccessKey: env.get().awsAccessKeySecret,
      },
      region: env.get().awsS3Region,
    };

    this.s3Client = new S3ClientAWS(s3Config);
  }

  async store(key: string, body: Buffer) {
    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: this.bucketName,
        Key: key,
        Body: body,
      }),
    );
  }

  async delete(key: string) {
    await this.s3Client.send(
      new DeleteObjectCommand({
        Bucket: this.bucketName,
        Key: key,
      }),
    );
  }
}
