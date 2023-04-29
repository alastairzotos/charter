import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Patch,
  Delete,
  Query,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { ServiceDto, ServiceNoId } from 'dtos';

import { AuthGuard } from 'auth/auth.guard';
import { Roles } from 'auth/roles.decorator';
import { ServicesService } from 'features/services/services.service';
import { Instance } from 'decorators/instance.decorator';

@Controller('services')
@UseGuards(AuthGuard)
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Get()
  @Roles('all')
  async getServicesForOperator(@Query('operatorId') operatorId: string) {
    return await this.servicesService.getServicesForOperator(operatorId);
  }

  @Get('all')
  @Roles('all')
  async getServicesForOperatorIncludingHidden(
    @Query('operatorId') operatorId: string,
  ) {
    return await this.servicesService.getServicesForOperatorIncludingHidden(
      operatorId,
    );
  }

  @Get('popular')
  @Roles('all')
  async getPopularServices() {
    return await this.servicesService.getPopularServices();
  }

  @Get(':id')
  @Roles('all')
  async getService(@Param('id') id: string) {
    return await this.servicesService.getService(id);
  }

  @Get('by-slug/:slug')
  @Roles('all')
  async getServiceBySlug(@Param('slug') slug: string) {
    try {
      return await this.servicesService.getServiceBySlug(slug);
    } catch {
      throw new NotFoundException();
    }
  }

  @Get('by-schema-id/:schemaId')
  @Roles('all')
  async getServicesWithOperatorsBySchemaId(
    @Param('schemaId') schemaId: string,
  ) {
    return await this.servicesService.getServicesWithOperatorsBySchemaId(
      schemaId,
    );
  }

  @Get('by-schema-category-id/:categoryId')
  @Roles('all')
  async getServicesWithOperatorsBySchemaCategoryId(
    @Instance() instance: string,
    @Param('categoryId') categoryId: string,
  ) {
    return await this.servicesService.getServicesWithOperatorsBySchemaCategoryId(
      categoryId,
      instance,
    );
  }

  @Post()
  async createService(@Body() service: ServiceNoId) {
    return await this.servicesService.createService(service);
  }

  @Patch()
  async updateService(
    @Body() { id, newService }: { id: string; newService: Partial<ServiceDto> },
  ) {
    return await this.servicesService.updateService(id, newService);
  }

  @Delete()
  async deleteService(@Body() { id }: { id: string }) {
    return await this.servicesService.deleteService(id);
  }
}
