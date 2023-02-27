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

  async addBookingToService(serviceId: string) {
    await this.servicesModel.findOneAndUpdate(
      { _id: serviceId },
      { $inc: { numberOfBookings: 1  } },
    );
  }

  async getServicesForOperator(operatorId: string) {
    return await this.servicesModel.find({ operator: operatorId }).populate('serviceSchema');
  }

  async getServices() {
    return await this.servicesModel.find().populate('serviceSchema');
  }

  async getService(id: string) {
    return await this.servicesModel.findOne({ _id: id }).populate('serviceSchema');
  }

  async getServicesWithOperatorsBySchemaId(schemaId: string) {
    return await this.servicesModel.find({ serviceSchema: schemaId }).populate(['operator', 'serviceSchema']);
  }

  async createService(service: ServiceNoId) {
    const { _id } = await this.servicesModel.create({ ...service, numberOfBookings: 0 });

    return _id;
  }

  async updateService(id: string, newService: Partial<ServiceDto>) {
    return await this.servicesModel.findOneAndUpdate({ _id: id }, newService);
  }

  async deleteService(id: string) {
    return await this.servicesModel.findOneAndDelete({ _id: id });
  }
}
