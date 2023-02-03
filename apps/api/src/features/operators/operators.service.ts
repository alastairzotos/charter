import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { OperatorDto, OperatorNoId } from 'dtos';

import { OperatorsRepository } from 'features/operators/operators.repository';
import { ServicesService } from 'features/services/services.service';

@Injectable()
export class OperatorsService {
  constructor(
    @Inject(forwardRef(() => ServicesService))
    private readonly servicesService: ServicesService,
    private readonly operatorsRepo: OperatorsRepository,
  ) {}

  async getOperators() {
    return await this.operatorsRepo.getOperators();
  }

  async getOperatorById(id: string) {
    return await this.operatorsRepo.getOperatorById(id);
  }

  async getOperatorByEmail(email: string) {
    return await this.operatorsRepo.getOperatorByEmail(email);
  }

  async getOperatorWithServicesById(id: string) {
    const operator = await this.getOperatorById(id);
    const services = await this.servicesService.getServicesForOperator(id);

    return {
      operator,
      services,
    };
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
