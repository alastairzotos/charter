import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  UseGuards,
  Param,
} from '@nestjs/common';
import {
  LoggedInUserDetails,
  OperatorDto,
  OperatorNoId,
  UserDetails,
} from 'dtos';

import { AuthGuard } from 'auth/auth.guard';
import { Roles } from 'auth/roles.decorator';
import { OperatorsService } from 'features/operators/operators.service';
import { Principal } from 'decorators/principal.decorator';
import { Instance } from 'decorators/instance.decorator';

@Controller('operators')
@UseGuards(AuthGuard)
export class OperatorsController {
  constructor(private readonly operatorsService: OperatorsService) {}

  @Get()
  @Roles('all')
  async getOperators(@Instance() instance: string) {
    return await this.operatorsService.getOperators(instance);
  }

  @Get('by-owner')
  @Roles('operator')
  async getOperatorByOwner(@Principal() user?: LoggedInUserDetails) {
    return await this.operatorsService.getOperatorByOwnerId(user?._id);
  }

  @Get(':id')
  @Roles('all')
  async getOperatorById(@Param('id') id: string) {
    return await this.operatorsService.getOperatorById(id);
  }

  @Get('with-services-by-slug/:slug')
  @Roles('all')
  async getOperatorWithServicesBySlug(@Param('slug') slug: string) {
    return await this.operatorsService.getOperatorWithServicesBySlug(slug);
  }

  @Post()
  async createOperator(
    @Principal() user: UserDetails,
    @Body() operator: OperatorNoId,
  ) {
    return await this.operatorsService.createOperator({
      ...operator,
      instance: user.instance,
    });
  }

  @Patch()
  async updateOperator(
    @Body()
    { id, newOperator }: { id: string; newOperator: Partial<OperatorDto> },
  ) {
    await this.operatorsService.updateOperator(id, newOperator);
  }

  @Delete()
  async deleteOperator(@Body() { id }: { id: string }) {
    await this.operatorsService.deleteOperator(id);
  }

  @Post('notification-token')
  async setOperatorNotificationToken(
    @Body() { id, token }: { id: string; token: string },
  ) {
    await this.operatorsService.setOperatorNotificationToken(id, token);
  }
}
