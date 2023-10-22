import { Module } from '@nestjs/common';
import { GoogleOAuthService } from './google-oauth.service';

@Module({
  providers: [GoogleOAuthService],
  exports: [GoogleOAuthService],
})
export class GoogleOAuthModule {}
