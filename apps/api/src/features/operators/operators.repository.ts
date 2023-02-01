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

  async getOperators() {
    return await this.operatorsModel.find();
  }

  async getOperatorById(id: string) {
    return await this.operatorsModel.findById(id);
  }

  async getOperatorByEmail(email: string) {
    return await this.operatorsModel.findOne({ email });
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
}
