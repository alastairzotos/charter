import { Module } from "@nestjs/common";
import { EnvModule } from "../environment/environment.module";
import { UsersModule } from "../users/users.module";
import { AuthGuard } from "./auth.guard";

@Module({
  imports: [EnvModule, UsersModule],
  providers: [AuthGuard],
  exports: [AuthGuard],
  controllers: []
})
export class AuthModule {}
