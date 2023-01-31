import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { OperatorDto, OperatorNoId } from 'dtos';

import { OperatorsRepository } from 'src/features/operators/operators.repository';
import { TripsService } from 'src/features/trips/trips.service';

@Injectable()
export class OperatorsService {
  constructor(
    @Inject(forwardRef(() => TripsService))
    private readonly tripsService: TripsService,
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

  async getOperatorWithTripsById(id: string) {
    const operator = await this.getOperatorById(id);
    const trips = await this.tripsService.getTripsForOperator(id);

    return {
      operator,
      trips,
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
