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
import { ServiceDto, ServiceNoId, ServiceType } from 'dtos';

import { AuthGuard } from 'auth/auth.guard';
import { Roles } from 'auth/roles.decorator';
import { ServicesService } from 'features/services/services.service';

@Controller('services')
@UseGuards(AuthGuard)
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Get()
  @Roles('all')
  async getServicesForOperator(@Query('operatorId') operatorId: string) {
    return await this.servicesService.getServicesForOperator(operatorId);
  }

  @Get(':id')
  @Roles('all')
  async getService(@Param('id') id: string) {
    return await this.servicesService.getService(id);
  }

  @Get('with-operator/:id')
  @Roles('all')
  async getServiceByIdWithOperator(@Param('id') id: string) {
    try {
      return await this.servicesService.getServiceByIdWithOperator(id);
    } catch {
      throw new NotFoundException();
    }
  }

  @Get('by-type/:type')
  @Roles('all')
  async getServicesWithOperatorsByType(@Param('type') type: ServiceType) {
    return await this.servicesService.getServicesWithOperatorsByType(type);
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
