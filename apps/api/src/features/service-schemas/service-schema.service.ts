import { Injectable } from "@nestjs/common";
import { ServiceSchemaDto } from "dtos";
import { ServiceSchemaRepository } from "features/service-schemas/service-schema.repository";

@Injectable()
export class ServiceSchemaService {
  constructor(
    private readonly serviceSchemaRepository: ServiceSchemaRepository
  ) {}

  async getServiceSchemas() {
    return await this.serviceSchemaRepository.getServiceSchemas();
  }
  
  async getServiceSchemaById(id: string) {
    return await this.serviceSchemaRepository.getServiceSchemaById(id);
  }

  async createServiceSchema(serviceSchema: ServiceSchemaDto) {
    return await this.serviceSchemaRepository.createServiceSchema(serviceSchema);
  }

  async updateServiceSchema(id: string, newServiceSchema: Partial<ServiceSchemaDto>) {
    return await this.serviceSchemaRepository.updateServiceSchema(id, newServiceSchema);
  }

  async deleteServiceSchema(id: string) {
    return await this.serviceSchemaRepository.deleteServiceSchema(id);
  }
}
