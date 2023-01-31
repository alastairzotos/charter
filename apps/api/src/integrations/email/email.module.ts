import { Module } from '@nestjs/common';

import { EnvModule } from 'src/environment/environment.module';
import { EmailService } from 'src/integrations/email/email.service';

@Module({
  imports: [EnvModule],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
