import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ServiceDto, ServiceNoId } from 'dtos';
import { Model } from 'mongoose';

import { Service } from 'schemas/service.schema';

@Injectable()
export class ServicesRepository {
  constructor(
    @InjectModel(Service.name) private readonly servicesModel: Model<Service>,
  ) {}

  async getServicesForOperator(operatorId: string) {
    return await this.servicesModel.find({ operator: operatorId });
  }

  async getService(id: string) {
    return await this.servicesModel.findById(id);
  }

  async getServicesWithOperatorsByType(type: string) {
    return await this.servicesModel.find({ type }).populate('operator');
  }

  async createService(service: ServiceNoId) {
    const { _id } = await this.servicesModel.create(service);

    return _id;
  }

  async updateService(id: string, newService: Partial<ServiceDto>) {
    return await this.servicesModel.findOneAndUpdate({ _id: id }, newService);
  }

  async deleteService(id: string) {
    return await this.servicesModel.findOneAndDelete({ _id: id });
  }
}
