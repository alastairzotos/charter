import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';
import { Operator } from "../schemas/operator.schema";
import { OperatorDto } from 'dtos';

@Injectable()
export class OperatorsRepository {
  constructor(
    @InjectModel(Operator.name) private readonly operatorsModel: Model<Operator>
  ) {}

  async getOperators() {
    return await this.operatorsModel.find();
  }

  async createOperator(operator: OperatorDto) {
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
