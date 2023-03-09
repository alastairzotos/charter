import { Injectable } from "@nestjs/common";
import { ServiceSchemaCategoryDto, ServiceSchemaCategoryNoId } from "dtos";
import { ServiceSchemaCategoryRepository } from "features/service-schema-categories/service-schema-categories.repository";

@Injectable()
export class ServiceSchemaCategoryService {
  constructor(
    private readonly repo: ServiceSchemaCategoryRepository,
  ) {}

  async getServiceSchemaCategories() {
    return await this.repo.getServiceSchemaCategories();
  }

  async getServiceSchemaCategoryById(id: string) {
    return await this.repo.getServiceSchemaCategoryById(id);
  }

  async createServiceSchemaCategory(category: ServiceSchemaCategoryNoId) {
    return await this.repo.createServiceSchemaCategory(category);
  }

  async updateServiceSchemaCategory(id: string, newSchemaServiceCategory: Partial<ServiceSchemaCategoryDto>) {
    return await this.repo.updateServiceSchemaCategory(id, newSchemaServiceCategory);
  }

  async deleteServiceSchemaCategory(id: string) {
    return await this.repo.deleteServiceSchemaCategory(id);
  }

  async searchServiceSchemaCategories(term: string) {
    return await this.repo.searchServiceSchemaCategories(term);
  }
}
