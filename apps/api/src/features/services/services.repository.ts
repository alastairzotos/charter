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
      { $inc: { numberOfBookings: 1 } },
    );
  }

  async getServicesForOperator(operatorId: string) {
    return await this.servicesModel
      .find({
        operator: operatorId,

        // Handle all falsy values
        $or: [
          { hidden: false },
          { hidden: undefined },
          { hidden: null },
          { hidden: 0 },
        ],
      })
      .populate('operator')
      .populate({
        path: 'serviceSchema',
        populate: {
          path: 'schemaCategory',
        },
      });
  }

  async getServicesForOperatorIncludingHidden(operatorId: string) {
    return await this.servicesModel.find({ operator: operatorId }).populate({
      path: 'serviceSchema',
      populate: {
        path: 'schemaCategory',
      },
    });
  }

  async getServices(instance: string) {
    return await this.servicesModel
      .find({ instance })
      .populate('serviceSchema');
  }

  async getServicesWithOperator(instance: string) {
    return await this.servicesModel.find({ instance }).populate('operator');
  }

  async getService(id: string) {
    return await this.servicesModel
      .findOne({ _id: id })
      .populate('serviceSchema');
  }

  async getServiceBySlug(slug: string, instance: string) {
    return await this.servicesModel
      .findOne({ slug, instance })
      .populate('operator')
      .populate({
        path: 'serviceSchema',
        populate: {
          path: 'schemaCategory',
        },
      });
  }

  async getServicesWithOperatorsBySchemaId(schemaId: string, instance: string) {
    const services = await this.servicesModel
      .find({ instance, serviceSchema: schemaId })
      .populate('operator')
      .populate({
        path: 'serviceSchema',
        populate: {
          path: 'schemaCategory',
        },
      });

    return services.filter((service) => !!service.operator);
  }

  async getServicesWithOperatorsBySchemaIds(
    schemaIds: string[],
    instance: string,
  ) {
    const services = await this.servicesModel
      .find({
        instance,
        serviceSchema: { $in: schemaIds },
      })
      .populate('operator')
      .populate({
        path: 'serviceSchema',
        populate: {
          path: 'schemaCategory',
        },
      });

    return services.filter((service) => !!service.operator);
  }

  async getServicesBySchemaIds(schemaIds: string[], instance: string) {
    const services = await this.servicesModel
      .find({ instance, serviceSchema: { $in: schemaIds } })
      .populate('operator');

    return services.filter((service) => !!service.operator);
  }

  async createService(service: ServiceNoId) {
    const { _id } = await this.servicesModel.create({
      ...service,
      numberOfBookings: 0,
    });

    return _id;
  }

  async updateService(id: string, newService: Partial<ServiceDto>) {
    return await this.servicesModel.findOneAndUpdate({ _id: id }, newService);
  }

  async deleteService(id: string) {
    return await this.servicesModel.findOneAndDelete({ _id: id });
  }

  async getServicesBySchema(schemaId: string) {
    return await this.servicesModel.find({ serviceSchema: schemaId });
  }

  async searchServices(term: string, instance: string) {
    return await this.servicesModel
      .find({
        $and: [{ instance }, { name: { $regex: new RegExp('^' + term, 'i') } }],
      })
      .populate('operator');
  }
}
