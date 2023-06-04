import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FeedbackNoId } from 'dtos';
import { Model } from 'mongoose';
import { Feedback } from 'schemas/feedback.schema';

@Injectable()
export class FeedbackRepository {
  constructor(
    @InjectModel(Feedback.name) private readonly feedbackModel: Model<Feedback>,
  ) {}

  async addFeedback(feedback: FeedbackNoId) {
    await this.feedbackModel.create(feedback);
  }

  async getFeedback(instance: string) {
    return await this.feedbackModel.find({ instance });
  }
}
