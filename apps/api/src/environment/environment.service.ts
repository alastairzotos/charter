import { Injectable } from '@nestjs/common';


@Injectable()
export class EnvService {
  private readonly env_vars = {
    dbConnectionString: process.env.DB_CONNECTION_STRING as string,
    jwtSigningKey: process.env.JWT_SIGNING_KEY as string,
    awsAccessKeyId: process.env.AWS_ACCESSKEY_ID as string,
    awsAccessKeySecret: process.env.AWS_ACCESS_KEY_SECRET as string,
    awsS3BucketName: process.env.AWS_S3_BUCKET_NAME as string,
    awsS3Region: process.env.AWS_S3_REGION as string,
    awsCloudfrontDomain: process.env.AWS_CLOUDFRONT_DOMAIN as string,
  };

  get() {
    return this.env_vars;
  }
}
