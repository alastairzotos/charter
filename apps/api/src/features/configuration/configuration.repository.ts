import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ConfigurationDto, defaultConfiguration } from 'dtos';
import { Model } from 'mongoose';
import { Configuration } from 'schemas/configuration.schema';

const CONFIG_ID = 'cafebabe3bd908811030a340';

@Injectable()
export class ConfigurationRepository {
  constructor(
    @InjectModel(Configuration.name)
    private readonly configModel: Model<Configuration>,
  ) {}

  async getConfig() {
    return await this.configModel.findOne({ _id: CONFIG_ID });
  }

  async setConfig(config: Partial<ConfigurationDto>) {
    await this.configModel.updateOne({ _id: CONFIG_ID }, config);
  }

  async initConfig() {
    await this.configModel.create({ _id: CONFIG_ID, ...defaultConfiguration });
  }
}
