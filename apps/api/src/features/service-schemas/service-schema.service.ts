import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { ServiceSchemaDto, ServiceSchemaNoId } from 'dtos';
import { ServiceSchemaRepository } from 'features/service-schemas/service-schema.repository';
import { ServicesService } from 'features/services/services.service';
import { pricingStrategyProvidesNumberOfPeople } from 'utils';

@Injectable()
export class ServiceSchemaService {
  constructor(
    private readonly serviceSchemaRepository: ServiceSchemaRepository,
    @Inject(forwardRef(() => ServicesService))
    private readonly servicesService: ServicesService,
  ) {}

  async getServiceSchemas(instance: string) {
    return await this.serviceSchemaRepository.getServiceSchemas(instance);
  }

  async getServiceSchemaById(id: string) {
    return await this.serviceSchemaRepository.getServiceSchemaById(id);
  }

  async getServicesSchemasByCategoryId(categoryId: string, instance: string) {
    return await this.serviceSchemaRepository.getServicesSchemasByCategoryId(
      categoryId,
      instance,
    );
  }

  async deleteServiceSchemasByCategoryId(categoryId: string) {
    await this.serviceSchemaRepository.deleteServiceSchemasByCategoryId(
      categoryId,
    );
  }

  async getServiceSchemasByCategoryIds(
    categoryIds: string[],
    instance: string,
  ) {
    return await this.serviceSchemaRepository.getServicesSchemasByCategoryIds(
      categoryIds,
      instance,
    );
  }

  async createServiceSchema(serviceSchema: ServiceSchemaNoId) {
    return await this.serviceSchemaRepository.createServiceSchema(
      serviceSchema,
    );
  }

  async updateServiceSchema(
    id: string,
    newServiceSchema: Partial<ServiceSchemaDto>,
  ) {
    await this.serviceSchemaRepository.updateServiceSchema(id, {
      ...newServiceSchema,
      defaultBookingFields: newServiceSchema.defaultBookingFields.filter(
        (field) =>
          field !== 'numberOfPeople' ||
          !pricingStrategyProvidesNumberOfPeople(
            newServiceSchema.pricingStrategy,
          ),
      ),
    });

    const updatedSchema =
      await this.serviceSchemaRepository.getServiceSchemaById(id);
    await this.servicesService.updateServicesWithNewServiceSchema(
      updatedSchema,
    );
  }

  async deleteServiceSchema(id: string) {
    await this.serviceSchemaRepository.deleteServiceSchema(id);
  }

  async searchServiceSchemas(term: string, instance: string) {
    return await this.serviceSchemaRepository.searchServiceSchemas(
      term,
      instance,
    );
  }
}
