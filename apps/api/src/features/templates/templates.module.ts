import { Module } from "@nestjs/common";
import { EnvModule } from "environment/environment.module";
import { TemplatesService } from "features/templates/templates.service";

@Module({
  imports: [
    EnvModule,
  ],
  providers: [TemplatesService],
  exports: [TemplatesService],
})
export class TemplatesModule {}
