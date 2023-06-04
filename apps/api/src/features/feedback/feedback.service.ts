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

    const superAdmins = await this.usersService.getSuperAdmins();
    for (const superAdmin of superAdmins) {
      await this.emailService.sendEmail(
        superAdmin.email,
        this.templatesService.feedbackAdded(feedback),
      );
    }
  }

  async getFeedback(instance: string) {
    return await this.feedbackRepo.getFeedback(instance);
  }
}
