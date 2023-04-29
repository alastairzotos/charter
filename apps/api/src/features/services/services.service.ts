import { forwardRef, Inject, Injectable } from '@nestjs/common';
import {
  getDefaultValueForServiceSchemaFieldType,
  ServiceDto,
  ServiceFieldValue,
  ServiceNoId,
  ServiceSchemaDto,
} from 'dtos';

import { OperatorsService } from 'features/operators/operators.service';
import { ServiceSchemaCategoryService } from 'features/service-schema-categories/service-schema-categories.service';
import { ServiceSchemaService } from 'features/service-schemas/service-schema.service';
import { ServicesRepository } from 'features/services/services.repository';
import { uniqBy } from 'lodash';
import { createServiceSlug } from 'urls';

@Injectable()
export class ServicesService {
  constructor(
    @Inject(forwardRef(() => OperatorsService))
    private readonly operatorsService: OperatorsService,
    private readonly serviceSchemaService: ServiceSchemaService,
    private readonly categoriesService: ServiceSchemaCategoryService,
    private readonly servicesRepository: ServicesRepository,
  ) {}

  async getServicesForOperator(operatorId: string) {
    return await this.servicesRepository.getServicesForOperator(operatorId);
  }

  async getServicesForOperatorIncludingHidden(operatorId: string) {
    return await this.servicesRepository.getServicesForOperatorIncludingHidden(
      operatorId,
    );
  }

  async getService(id: string) {
    return await this.servicesRepository.getService(id);
  }

  async getServiceBySlug(slug: string) {
    return await this.servicesRepository.getServiceBySlug(slug);
  }

  async addBookingToService(serviceId: string) {
    await this.servicesRepository.addBookingToService(serviceId);
  }

  async getServicesWithOperatorsBySchemaId(schemaId: string) {
    return await this.servicesRepository.getServicesWithOperatorsBySchemaId(
      schemaId,
    );
  }

  async getServicesWithOperatorsBySchemaCategoryId(
    categoryId: string,
    instance: string,
  ) {
    const schemas =
      await this.serviceSchemaService.getServicesSchemasByCategoryId(
        categoryId,
        instance,
      );
    return await this.servicesRepository.getServicesWithOperatorsBySchemaIds(
      schemas.map((schema) => schema._id),
    );
  }

  async createService(service: ServiceNoId) {
    return await this.servicesRepository.createService({
      ...service,
      slug: await this.createServiceSlug(service),
    });
  }

  async updateService(id: string, newService: Partial<ServiceDto>) {
    return await this.servicesRepository.updateService(id, {
      ...newService,
      slug: await this.createServiceSlug(newService),
    });
  }

  async deleteService(id: string) {
    return await this.servicesRepository.deleteService(id);
  }

  async updateServicesWithNewServiceSchema(updatedSchema: ServiceSchemaDto) {
    const services = await this.servicesRepository.getServicesBySchema(
      updatedSchema._id,
    );

    for (const service of services.map((s) => s.toObject())) {
      const serviceFields = Object.keys(service.data);
      const schemaFields = updatedSchema.fields.map((field) => field.label);

      const missingFieldsNames = schemaFields.filter(
        (field) => !serviceFields.includes(field),
      );
      const missingFields = updatedSchema.fields.filter((field) =>
        missingFieldsNames.includes(field.label),
      );

      const addedDefaults = missingFields.reduce<
        Record<string, ServiceFieldValue>
      >(
        (acc, cur) => ({
          ...acc,
          [cur.label]: getDefaultValueForServiceSchemaFieldType(cur.type),
        }),
        {},
      );

      await this.servicesRepository.updateService(service._id, {
        ...service,
        data: {
          ...service.data,
          ...addedDefaults,
        },
      });
    }
  }

  async getPopularServices() {
    const services = await this.servicesRepository.getServicesWithOperator();

    const maxServices = 10;

    return this.sortServicesByPopularity(services).slice(0, maxServices);
  }

  async searchServices(term: string, instance: string) {
    const [servicesSearchedByName, categories, serviceSchemas] =
      await Promise.all([
        this.servicesRepository.searchServices(term, instance),
        this.categoriesService.searchServiceSchemaCategories(term, instance),
        this.serviceSchemaService.searchServiceSchemas(term, instance),
      ]);

    const schemasByCategories =
      await this.serviceSchemaService.getServiceSchemasByCategoryIds(
        categories.map((category) => category._id),
        instance,
      );

    const allSchemasToSearch = uniqBy(
      [...serviceSchemas, ...schemasByCategories],
      (schema) => schema._id.toString(),
    );

    const servicesBySchemas =
      await this.servicesRepository.getServicesBySchemaIds(
        allSchemasToSearch.map((schema) => schema._id),
      );

    const allServices = uniqBy(
      [...servicesSearchedByName, ...servicesBySchemas],
      (service) => service._id.toString(),
    );

    return this.sortServicesByPopularity(allServices);
  }

  private sortServicesByPopularity(services: ServiceDto[]) {
    return services
      .sort((a, b) => a.numberOfBookings - b.numberOfBookings)
      .slice()
      .reverse();
  }

  private async createServiceSlug(service: Partial<ServiceDto>) {
    const operator = await this.operatorsService.getOperatorById(
      service.operator as unknown as string,
    );
    return createServiceSlug({
      ...service,
      operator,
    });
  }
}
