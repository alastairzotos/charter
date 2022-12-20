import { Module } from "@nestjs/common";
import { EnvModule } from "../environment/environment.module";
import { S3Module } from "../s3/s3.module";
import { ImagesController } from "./images.controller";
import { ImagesService } from "./images.service";

@Module({
  imports: [
    S3Module,
    EnvModule,
  ],
  providers: [ImagesService],
  exports: [ImagesService],
  controllers: [ImagesController],
})
export class ImagesModule {}
