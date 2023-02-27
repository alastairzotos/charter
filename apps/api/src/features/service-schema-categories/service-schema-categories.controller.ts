import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "auth/auth.guard";
import { Roles } from "auth/roles.decorator";
import { ServiceSchemaCategoryDto, ServiceSchemaCategoryNoId } from "dtos";
import { ServiceSchemaCategoryService } from "features/service-schema-categories/service-schema-categories.service";

@Controller('service-schema-categories')
@UseGuards(AuthGuard)
export class ServiceSchemaCategoryController {
  constructor(
    private readonly service: ServiceSchemaCategoryService,
  ) {}

  @Get()
  @Roles('all')
  async getServiceSchemaCategories() {
    return await this.service.getServiceSchemaCategories();
  }

  @Get(':id')
  @Roles('all')
  async getServiceSchemaCategoryById(
    @Param('id') id: string
  ) {
    return await this.service.getServiceSchemaCategoryById(id);
  }

  @Post()
  async createServiceSchemaCategory(
    @Body() category: ServiceSchemaCategoryNoId
  ) {
    return await this.service.createServiceSchemaCategory(category);
  }

  @Patch()
  async updateServiceSchemaCategory(
    @Body() { id, newSchemaServiceCategory }: { id: string, newSchemaServiceCategory: Partial<ServiceSchemaCategoryDto> }
  ) {
    return await this.service.updateServiceSchemaCategory(id, newSchemaServiceCategory);
  }

  @Delete()
  async deleteServiceSchemaCategory(
    @Body() { id }: { id: string }
  ) {
    return await this.service.deleteServiceSchemaCategory(id);
  }
}
