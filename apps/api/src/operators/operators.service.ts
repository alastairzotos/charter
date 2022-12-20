import { Injectable } from "@nestjs/common";
import { v4 as uuidv4 } from 'uuid';
import { OperatorDto, OperatorNoId } from 'dtos';
import { OperatorsRepository } from "./operators.repository";
import { S3Service } from '../s3/s3.service';
import { EnvService } from "../environment/environment.service";

@Injectable()
export class OperatorsService {
  constructor(
    private readonly s3Service: S3Service,
    private readonly env: EnvService,
    private readonly operatorsRepo: OperatorsRepository,
  ) {}

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

  async uploadPhoto(buffer: Buffer) {
    const id = uuidv4();

    await this.s3Service.store(id, buffer);

    return `${this.env.get().awsCloudfrontDomain}${id}`;
  }
}
