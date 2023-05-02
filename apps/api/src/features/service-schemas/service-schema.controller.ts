import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from 'auth/auth.guard';
import { Roles } from 'auth/roles.decorator';
import { Instance } from 'decorators/instance.decorator';
import { InstanceDto, ServiceSchemaDto, ServiceSchemaNoId } from 'dtos';
import { ServiceSchemaService } from 'features/service-schemas/service-schema.service';
import { SentryInterceptor } from 'interceptors/sentry.interceptor';

@Controller('service-schemas')
@UseGuards(AuthGuard)
@UseInterceptors(SentryInterceptor)
export class ServiceSchemaController {
  constructor(private readonly serviceSchemaService: ServiceSchemaService) {}

  @Get()
  @Roles('all')
  async getServiceSchemas(@Instance() instance: string) {
    return await this.serviceSchemaService.getServiceSchemas(instance);
  }

  @Get(':id')
  @Roles('all')
  async getServiceSchemaById(@Param('id') id: string) {
    return await this.serviceSchemaService.getServiceSchemaById(id);
  }

  @Post()
  async createServiceSchema(
    @Instance() instance: InstanceDto,
    @Body() serviceSchema: ServiceSchemaNoId,
  ) {
    return await this.serviceSchemaService.createServiceSchema({
      ...serviceSchema,
      instance,
    });
  }

  @Patch()
  async updateServiceSchema(
    @Body()
    {
      id,
      newServiceSchema,
    }: {
      id: string;
      newServiceSchema: Partial<ServiceSchemaDto>;
    },
  ) {
    return await this.serviceSchemaService.updateServiceSchema(
      id,
      newServiceSchema,
    );
  }

  @Delete()
  async deleteServiceSchema(@Body() { id }: { id: string }) {
    return await this.serviceSchemaService.deleteServiceSchema(id);
  }
}
