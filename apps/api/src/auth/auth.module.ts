import { Module } from "@nestjs/common";
import { EnvModule } from "src/environment/environment.module";
import { UsersModule } from "src/users/users.module";
import { AuthGuard } from "./auth.guard";

@Module({
  imports: [EnvModule, UsersModule],
  providers: [AuthGuard],
  exports: [AuthGuard],
  controllers: []
})
export class AuthModule {}
