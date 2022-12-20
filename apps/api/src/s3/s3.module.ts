import { Module } from "@nestjs/common";
import { EnvModule } from "src/environment/environment.module";
import { EnvService } from "src/environment/environment.service";
import { S3Service } from "./s3.service";

@Module({
  imports: [EnvModule],
  providers: [S3Service],
  exports: [S3Service]
})
export class S3Module {}
