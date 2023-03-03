import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { ServiceDto, ServiceNoId } from 'dtos';

import { OperatorsService } from 'features/operators/operators.service';
import { ServiceSchemaService } from 'features/service-schemas/service-schema.service';
import { ServicesRepository } from 'features/services/services.repository';

@Injectable()
export class ServicesService {
  constructor(
    @Inject(forwardRef(() => OperatorsService))
    private readonly operatorsService: OperatorsService,
    private readonly serviceSchemaService: ServiceSchemaService,
    private readonly servicesRepository: ServicesRepository,
  ) {}

  async getServicesForOperator(operatorId: string) {
    return await this.servicesRepository.getServicesForOperator(operatorId);
  }

  async getService(id: string) {
    return await this.servicesRepository.getService(id);
  }

  async getServiceByIdWithOperator(id: string) {
    const service = await this.servicesRepository.getService(id);

    return {
      service,
      operator: await this.operatorsService.getOperatorById(
        service.operator as unknown as string,
      ),
    };
  }

  async addBookingToService(serviceId: string) {
    await this.servicesRepository.addBookingToService(serviceId);
  }

  async getServicesWithOperatorsBySchemaId(schemaId: string) {
    return await this.servicesRepository.getServicesWithOperatorsBySchemaId(schemaId);
  }

  async getServicesWithOperatorsBySchemaCategoryId(categoryId: string) {
    const schemas = await this.serviceSchemaService.getServicesSchemasByCategoryId(categoryId);
    return await this.servicesRepository.getServicesWithOperatorsBySchemaIds(schemas.map(schema => schema._id));
  }

  async createService(service: ServiceNoId) {
    return await this.servicesRepository.createService(service);
  }

  async updateService(id: string, newService: Partial<ServiceDto>) {
    return await this.servicesRepository.updateService(id, newService);
  }

  async deleteService(id: string) {
    return await this.servicesRepository.deleteService(id);
  }
}
