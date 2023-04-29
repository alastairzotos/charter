import { Injectable } from '@nestjs/common';
import { InstanceDto, InstanceNoId } from 'dtos';
import { InstancesRepository } from 'features/instances/instances.repository';

@Injectable()
export class InstancesService {
  constructor(private readonly instancesRepo: InstancesRepository) {}

  async getInstances() {
    return await this.instancesRepo.getInstances();
  }

  async getInstanceById(id: string) {
    return await this.instancesRepo.getInstanceById(id);
  }

  async createInstance(instance: InstanceNoId) {
    return await this.instancesRepo.createInstance(instance);
  }

  async updateInstance(id: string, instance: Partial<InstanceDto>) {
    await this.instancesRepo.updateInstance(id, instance);
  }
}
