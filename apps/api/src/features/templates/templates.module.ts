import { Module } from "@nestjs/common";
import { EnvModule } from "environment/environment.module";
import { QRCodeModule } from "features/qr-code/qr-code.module";
import { TemplatesService } from "features/templates/templates.service";

@Module({
  imports: [
    EnvModule,
    QRCodeModule,
  ],
  providers: [TemplatesService],
  exports: [TemplatesService],
})
export class TemplatesModule {}
