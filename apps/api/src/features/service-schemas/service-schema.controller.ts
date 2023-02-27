import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "auth/auth.guard";
import { Roles } from "auth/roles.decorator";
import { ServiceSchemaDto, ServiceSchemaNoId } from "dtos";
import { ServiceSchemaService } from "features/service-schemas/service-schema.service";

@Controller('service-schemas')
@UseGuards(AuthGuard)
export class ServiceSchemaController {
  constructor(
    private readonly serviceSchemaService: ServiceSchemaService
  ) {}

  @Get()
  @Roles('all')
  async getServiceSchemas() {
    return await this.serviceSchemaService.getServiceSchemas();
  }

  @Get(':id')
  @Roles('all')
  async getServiceSchemaById(
    @Param('id') id: string
  ) {
    return await this.serviceSchemaService.getServiceSchemaById(id);
  }

  @Post()
  async createServiceSchema(serviceSchema: ServiceSchemaNoId) {
    return await this.serviceSchemaService.createServiceSchema(serviceSchema);
  }

  @Patch()
  async updateServiceSchema(
    @Body() { id, newServiceSchema }: { id: string, newServiceSchema: Partial<ServiceSchemaDto> }
  ) {
    return await this.serviceSchemaService.updateServiceSchema(id, newServiceSchema);
  }

  @Delete()
  async deleteServiceSchema(
    @Body() { id }: { id: string }
  ) {
    return await this.serviceSchemaService.deleteServiceSchema(id);
  }
}
