import { Module } from '@nestjs/common';

import { AuthGuard } from 'auth/auth.guard';
import { EnvModule } from 'environment/environment.module';
import { UsersModule } from 'features/users/users.module';

@Module({
  imports: [EnvModule, UsersModule],
  providers: [AuthGuard],
  exports: [AuthGuard],
  controllers: [],
})
export class AuthModule {}
