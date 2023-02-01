import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { EnvModule } from 'environment/environment.module';
import { UsersController } from 'features/users/users.controller';
import { UsersRepository } from 'features/users/users.repository';
import { UsersService } from 'features/users/users.service';
import { User, UserSchema } from 'schemas/user.schema';

@Module({
  imports: [
    EnvModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  exports: [UsersService],
})
export class UsersModule {}
