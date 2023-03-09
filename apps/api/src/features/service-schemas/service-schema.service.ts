import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { ServiceSchemaDto, ServiceSchemaNoId } from "dtos";
import { ServiceSchemaRepository } from "features/service-schemas/service-schema.repository";
import { ServicesService } from "features/services/services.service";

@Injectable()
export class ServiceSchemaService {
  constructor(
    private readonly serviceSchemaRepository: ServiceSchemaRepository,
    @Inject(forwardRef(() => ServicesService)) private readonly servicesService: ServicesService,
  ) {}

  async getServiceSchemas() {
    return await this.serviceSchemaRepository.getServiceSchemas();
  }

  async getServiceSchemaById(id: string) {
    return await this.serviceSchemaRepository.getServiceSchemaById(id);
  }

  async getServicesSchemasByCategoryId(categoryId: string) {
    return await this.serviceSchemaRepository.getServicesSchemasByCategoryId(categoryId);
  }

  async getServicesSchemasByCategoryIds(categoryIds: string[]) {
    return await this.serviceSchemaRepository.getServicesSchemasByCategoryIds(categoryIds);
  }

  async createServiceSchema(serviceSchema: ServiceSchemaNoId) {
    return await this.serviceSchemaRepository.createServiceSchema(serviceSchema);
  }

  async updateServiceSchema(id: string, newServiceSchema: Partial<ServiceSchemaDto>) {
    await this.serviceSchemaRepository.updateServiceSchema(id, newServiceSchema);

    const updatedSchema = await this.serviceSchemaRepository.getServiceSchemaById(id);
    await this.servicesService.updateServicesWithNewServiceSchema(updatedSchema);
  }

  async deleteServiceSchema(id: string) {
    await this.serviceSchemaRepository.deleteServiceSchema(id);
  }

  async searchServiceSchemas(term: string) {
    return await this.serviceSchemaRepository.searchServiceSchemas(term);
  }
}
