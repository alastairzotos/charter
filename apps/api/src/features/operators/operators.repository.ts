import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { OperatorDto, OperatorNoId } from 'dtos';
import { Model } from 'mongoose';

import { Operator } from 'schemas/operator.schema';

@Injectable()
export class OperatorsRepository {
  constructor(
    @InjectModel(Operator.name)
    private readonly operatorsModel: Model<Operator>,
  ) {}

  async getOperators(instance: string) {
    return await this.operatorsModel.find({ instance }).populate('owner');
  }

  async getOperatorById(id: string) {
    return await this.operatorsModel.findById(id).populate('owner');
  }

  async getOperatorByIdWithInstance(id: string) {
    return await this.operatorsModel
      .findById(id)
      .populate(['owner', 'instance']);
  }

  async getOperatorBySlug(slug: string, instance: string) {
    return await this.operatorsModel
      .findOne({ slug, instance })
      .populate('owner');
  }

  async getOperatorByOwnerId(id: string) {
    return await this.operatorsModel
      .findOne({ owner: { _id: id } })
      .populate('owner');
  }

  async getOperatorByEmail(email: string) {
    return await this.operatorsModel.findOne({ email }).populate('owner');
  }

  async createOperator(operator: OperatorNoId) {
    const { _id } = await this.operatorsModel.create(operator);

    return _id;
  }

  async updateOperator(id: string, newOperator: Partial<OperatorDto>) {
    await this.operatorsModel.findOneAndUpdate({ _id: id }, newOperator);
  }

  async deleteOperator(id: string) {
    await this.operatorsModel.deleteOne({ _id: id });
  }

  async searchOperators(term: string, instance: string) {
    return await this.operatorsModel
      .find({
        $and: [{ instance }, { name: { $regex: new RegExp('^' + term, 'i') } }],
      })
      .populate('owner');
  }

  async setOperatorNotificationToken(
    id: string,
    notificationsToken: string | undefined,
  ) {
    await this.operatorsModel.findOneAndUpdate(
      { _id: id },
      { notificationsToken },
    );
  }

  async getOperatorNotificationToken(id: string) {
    return (
      await this.operatorsModel
        .findOne({ _id: id })
        .select('notificationsToken')
    ).notificationsToken;
  }
}
