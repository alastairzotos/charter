import { Injectable } from '@nestjs/common';
import { FeedbackNoId, InstanceDto } from 'dtos';
import { FeedbackRepository } from 'features/feedback/feedback.repository';
import { TemplatesService } from 'features/templates/templates.service';
import { UsersService } from 'features/users/users.service';
import { EmailService } from 'integrations/email/email.service';

@Injectable()
export class FeedbackService {
  constructor(
    private readonly templatesService: TemplatesService,
    private readonly emailService: EmailService,
    private readonly usersService: UsersService,
    private readonly feedbackRepo: FeedbackRepository,
  ) {}

  async addFeedback(instance: InstanceDto, feedback: FeedbackNoId) {
    await this.feedbackRepo.addFeedback({
      ...feedback,
      instance,
    });

    const admins = await this.usersService.getAdmins(
      instance as unknown as string,
    );
    for (const admin of admins) {
      await this.emailService.sendEmail(
        admin.email,
        this.templatesService.feedbackAdded(feedback),
      );
    }
  }

  async getFeedback(instance: string) {
    return await this.feedbackRepo.getFeedback(instance);
  }
}
