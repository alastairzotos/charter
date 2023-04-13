import { Module } from "@nestjs/common";
import { EnvModule } from "environment/environment.module";
import { OAuth2Controller } from "features/oauth2/oauth2.controller";
import { OAuth2Service } from "features/oauth2/oauth2.service";
import { UsersModule } from "features/users/users.module";

@Module({
  imports: [
    EnvModule,
    UsersModule,
  ],
  controllers: [OAuth2Controller],
  providers: [OAuth2Service],
  exports: [OAuth2Service],
})
export class OAuth2Module {}