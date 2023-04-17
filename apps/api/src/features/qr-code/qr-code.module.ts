import { Module } from "@nestjs/common";
import { EnvModule } from "environment/environment.module";
import { QRCodeService } from "features/qr-code/qr-code.service";
import { S3Module } from "integrations/s3/s3.module";

@Module({
  imports: [
    EnvModule,
    S3Module,
  ],
  providers: [QRCodeService],
  exports: [QRCodeService],
})
export class QRCodeModule {}
