import { Module } from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from "src/schemas/user.schema";
import { EnvModule } from "../environment/environment.module";
import { UsersController } from "./users.controller";

import { UsersRepository } from "./users.repository";
import { UsersService } from "./users.service";

@Module({
  imports: [
    EnvModule,
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema }
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  exports: [UsersService],
})
export class UsersModule {}
