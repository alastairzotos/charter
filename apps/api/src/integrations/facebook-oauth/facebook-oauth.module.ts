import { Module } from '@nestjs/common';
import { FacebookOAuthService } from './facebook-oauth.service';

@Module({
  providers: [FacebookOAuthService],
  exports: [FacebookOAuthService],
})
export class FacebookOAuthModule {}
