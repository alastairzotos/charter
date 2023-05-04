import { Injectable } from '@nestjs/common';
import { ConfigurationDto, defaultConfiguration } from 'dtos';
import { ConfigurationRepository } from 'features/configuration/configuration.repository';

@Injectable()
export class ConfigurationService {
  constructor(private readonly configRepo: ConfigurationRepository) {}

  async getConfig() {
    let config = await this.configRepo.getConfig();

    if (!config) {
      await this.configRepo.initConfig();
      config = await this.configRepo.getConfig();
    }

    return config;
  }

  async setConfig(config: Partial<ConfigurationDto>) {
    await this.configRepo.setConfig(config);
  }
}
