import { Module } from '@nestjs/common';

import { AuthGuard } from 'src/auth/auth.guard';
import { EnvModule } from 'src/environment/environment.module';
import { UsersModule } from 'src/features/users/users.module';

@Module({
  imports: [EnvModule, UsersModule],
  providers: [AuthGuard],
  exports: [AuthGuard],
  controllers: [],
})
export class AuthModule {}
