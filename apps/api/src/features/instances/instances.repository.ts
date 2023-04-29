import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { InstanceDto, InstanceNoId } from 'dtos';
import { Model } from 'mongoose';
import { Instance } from 'schemas/instance.schema';

@Injectable()
export class InstancesRepository {
  constructor(
    @InjectModel(Instance.name) private readonly instanceModel: Model<Instance>,
  ) {}

  async getInstances() {
    return await this.instanceModel.find();
  }

  async getInstanceById(id: string) {
    return await this.instanceModel.findById(id);
  }

  async createInstance(instance: InstanceNoId) {
    const { _id } = await this.instanceModel.create(instance);

    return _id;
  }

  async updateInstance(id: string, instance: Partial<InstanceDto>) {
    await this.instanceModel.findOneAndUpdate({ _id: id }, instance);
  }
}
