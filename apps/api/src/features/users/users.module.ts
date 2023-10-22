import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { EnvModule } from 'environment/environment.module';
import { TemplatesModule } from 'features/templates/templates.module';
import { UsersController } from 'features/users/users.controller';
import { UsersRepository } from 'features/users/users.repository';
import { UsersService } from 'features/users/users.service';
import { EmailModule } from 'integrations/email/email.module';
import { FacebookOAuthModule } from 'integrations/facebook-oauth/facebook-oauth.module';
import { GoogleOAuthModule } from 'integrations/google-oauth/google-oauth.module';
import {
  ResetPasswordOtc,
  ResetPasswordOtcSchema,
} from 'schemas/reset-pwd-otc.schema';
import { User, UserSchema } from 'schemas/user.schema';

@Module({
  imports: [
    EnvModule,
    FacebookOAuthModule,
    GoogleOAuthModule,
    EmailModule,
    TemplatesModule,
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: ResetPasswordOtc.name, schema: ResetPasswordOtcSchema },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  exports: [UsersService],
})
export class UsersModule {}
