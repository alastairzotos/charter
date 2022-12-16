import { Injectable } from "@nestjs/common";
import { OperatorsRepository } from "./operators.repository";
import { OperatorDto } from 'dtos';

@Injectable()
export class OperatorsService {
  constructor(private readonly operatorsRepo: OperatorsRepository) {}

  async getOperators() {
    return await this.operatorsRepo.getOperators();
  }

  async createOperator(operator: OperatorDto) {
    return await this.operatorsRepo.createOperator(operator);
  }

  async updateOperator(id: string, newOperator: Partial<OperatorDto>) {
    await this.operatorsRepo.updateOperator(id, newOperator);
  }

  async deleteOperator(id: string) {
    await this.operatorsRepo.deleteOperator(id);
  }
}
