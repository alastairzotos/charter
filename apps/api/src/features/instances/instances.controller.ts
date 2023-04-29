import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'auth/auth.guard';
import { Roles } from 'auth/roles.decorator';
import { InstanceDto, InstanceNoId } from 'dtos';
import { InstancesService } from 'features/instances/instances.service';

@Controller('instances')
@UseGuards(AuthGuard)
export class InstancesController {
  constructor(private readonly instancesService: InstancesService) {}

  @Get()
  @Roles('super-admin')
  async getInstances() {
    return await this.instancesService.getInstances();
  }

  @Get(':id')
  @Roles('super-admin')
  async getInstanceById(@Param('id') id: string) {
    return await this.instancesService.getInstanceById(id);
  }

  @Post()
  @Roles('super-admin')
  async createInstance(@Body() instance: InstanceNoId) {
    return await this.instancesService.createInstance(instance);
  }

  @Patch()
  @Roles('super-admin')
  async updateInstance(
    @Body()
    { id, newInstance }: { id: string; newInstance: Partial<InstanceDto> },
  ) {
    return await this.instancesService.updateInstance(id, newInstance);
  }
}
