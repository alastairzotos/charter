import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EnvModule } from 'environment/environment.module';
import { FeedbackController } from 'features/feedback/feedback.controller';
import { FeedbackRepository } from 'features/feedback/feedback.repository';
import { FeedbackService } from 'features/feedback/feedback.service';
import { TemplatesModule } from 'features/templates/templates.module';
import { UsersModule } from 'features/users/users.module';
import { EmailModule } from 'integrations/email/email.module';
import { Feedback, FeedbackSchema } from 'schemas/feedback.schema';

@Module({
  imports: [
    UsersModule,
    EnvModule,
    EmailModule,
    TemplatesModule,
    MongooseModule.forFeature([
      { name: Feedback.name, schema: FeedbackSchema },
    ]),
  ],
  controllers: [FeedbackController],
  providers: [FeedbackService, FeedbackRepository],
  exports: [FeedbackService],
})
export class FeedbackModule {}
