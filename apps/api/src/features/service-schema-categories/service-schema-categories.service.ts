import { Injectable } from '@nestjs/common';
import { ServiceSchemaCategoryDto, ServiceSchemaCategoryNoId } from 'dtos';
import { ServiceSchemaCategoryRepository } from 'features/service-schema-categories/service-schema-categories.repository';
import { ServiceSchemaService } from 'features/service-schemas/service-schema.service';

@Injectable()
export class ServiceSchemaCategoryService {
  constructor(
    private readonly serviceSchemaService: ServiceSchemaService,
    private readonly repo: ServiceSchemaCategoryRepository,
  ) {}

  async getServiceSchemaCategories(instance: string) {
    return await this.repo.getServiceSchemaCategories(instance);
  }

  async getServiceSchemaCategoryById(id: string) {
    return await this.repo.getServiceSchemaCategoryById(id);
  }

  async createServiceSchemaCategory(category: ServiceSchemaCategoryNoId) {
    return await this.repo.createServiceSchemaCategory(category);
  }

  async updateServiceSchemaCategory(
    id: string,
    newSchemaServiceCategory: Partial<ServiceSchemaCategoryDto>,
  ) {
    return await this.repo.updateServiceSchemaCategory(
      id,
      newSchemaServiceCategory,
    );
  }

  async deleteServiceSchemaCategory(id: string) {
    await this.serviceSchemaService.deleteServiceSchemasByCategoryId(id);

    return await this.repo.deleteServiceSchemaCategory(id);
  }

  async searchServiceSchemaCategories(term: string, instance: string) {
    return await this.repo.searchServiceSchemaCategories(term, instance);
  }
}
