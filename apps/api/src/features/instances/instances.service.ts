import { Injectable } from '@nestjs/common';
import { InstanceDto, InstanceNoId } from 'dtos';
import { InstancesRepository } from 'features/instances/instances.repository';
import { UsersService } from 'features/users/users.service';

@Injectable()
export class InstancesService {
  constructor(
    private readonly usersService: UsersService,
    private readonly instancesRepo: InstancesRepository,
  ) {}

  async getInstances() {
    return await this.instancesRepo.getInstances();
  }

  async getInstanceById(id: string) {
    return await this.instancesRepo.getInstanceById(id);
  }

  async createInstance(instance: InstanceNoId) {
    return await this.instancesRepo.createInstance(instance);
  }

  async updateInstance(id: string, newInstance: Partial<InstanceDto>) {
    await this.instancesRepo.updateInstance(id, newInstance);

    const instance = await this.instancesRepo.getInstanceById(id);

    if (!!newInstance.admins) {
      for (const admin of newInstance.admins) {
        const adminUser = await this.usersService.getUserByEmail(admin.email);

        if (adminUser.role !== 'super-admin' && adminUser.role !== 'operator') {
          this.usersService.updateUser(adminUser._id, {
            role: 'admin',
            instance,
          });
        }
      }
    }
  }
}
