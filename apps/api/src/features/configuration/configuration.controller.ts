import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'auth/auth.guard';
import { Roles } from 'auth/roles.decorator';
import { ConfigurationDto } from 'dtos';
import { ConfigurationService } from 'features/configuration/configuration.service';

@Controller('config')
@UseGuards(AuthGuard)
export class ConfigurationController {
  constructor(private readonly configService: ConfigurationService) {}

  @Get()
  @Roles('all')
  async getConfig() {
    return await this.configService.getConfig();
  }

  @Post()
  @Roles('super-admin')
  async setConfig(@Body() config: ConfigurationDto) {
    await this.configService.setConfig(config);
  }
}
