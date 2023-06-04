import { Body, Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { Instance } from 'decorators/instance.decorator';
import { FeedbackNoId, InstanceDto } from 'dtos';
import { FeedbackService } from 'features/feedback/feedback.service';
import { SentryInterceptor } from 'interceptors/sentry.interceptor';

@Controller('feedback')
@UseInterceptors(SentryInterceptor)
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Post()
  async addFeedback(
    @Instance() instance: InstanceDto,
    @Body() feedback: FeedbackNoId,
  ) {
    await this.feedbackService.addFeedback(instance, feedback);
  }

  @Get()
  async getFeedback(@Instance() instance: string) {
    return await this.feedbackService.getFeedback(instance);
  }
}
