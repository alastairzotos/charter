import { Injectable } from "@nestjs/common";
import { OperatorsRepository } from "./operators.repository";
import { OperatorDto, OperatorNoId } from 'dtos';

@Injectable()
export class OperatorsService {
  constructor(private readonly operatorsRepo: OperatorsRepository) {}

  async getOperators() {
    return await this.operatorsRepo.getOperators();
  }

  async getOperatorById(id: string) {
    return await this.operatorsRepo.getOperatorById(id);
  }

  async createOperator(operator: OperatorNoId) {
    return await this.operatorsRepo.createOperator(operator);
  }

  async updateOperator(id: string, newOperator: Partial<OperatorDto>) {
    await this.operatorsRepo.updateOperator(id, newOperator);
  }

  async deleteOperator(id: string) {
    await this.operatorsRepo.deleteOperator(id);
  }
}
