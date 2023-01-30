import { Module } from "@nestjs/common";
import { EnvModule } from "../../environment/environment.module";
import { EmailService } from "./email.service";

@Module({
  imports: [
    EnvModule
  ],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
