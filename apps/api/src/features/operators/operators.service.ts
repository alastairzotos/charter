import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { OperatorDto, OperatorNoId } from 'dtos';

import { OperatorsRepository } from 'features/operators/operators.repository';
import { ServicesService } from 'features/services/services.service';
import { UsersService } from 'features/users/users.service';

@Injectable()
export class OperatorsService {
  constructor(
    @Inject(forwardRef(() => ServicesService))
    private readonly servicesService: ServicesService,
    private readonly operatorsRepo: OperatorsRepository,
    private readonly usersService: UsersService,
  ) {}

  async getOperators() {
    return await this.operatorsRepo.getOperators();
  }

  async getOperatorById(id: string) {
    return await this.operatorsRepo.getOperatorById(id);
  }

  async getOperatorByOwnerId(id: string) {
    return await this.operatorsRepo.getOperatorByOwnerId(id);
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

    if (!!newOperator.owner) {
      await this.usersService.promoteBasicUserToOperator(newOperator.owner._id);
    }
  }

  async deleteOperator(id: string) {
    await this.operatorsRepo.deleteOperator(id);
  }

  async searchOperators(term: string) {
    return await this.operatorsRepo.searchOperators(term);
  }
}
