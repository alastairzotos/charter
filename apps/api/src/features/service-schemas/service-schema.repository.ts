import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ServiceSchemaDto, ServiceSchemaNoId } from 'dtos';
import { Model } from 'mongoose';
import { ServiceSchema } from 'schemas/service-schema.schema';

@Injectable()
export class ServiceSchemaRepository {
  constructor(
    @InjectModel(ServiceSchema.name)
    private readonly serviceSchemasModel: Model<ServiceSchema>,
  ) {}

  async getServiceSchemas(instance: string) {
    return await this.serviceSchemasModel
      .find({ instance })
      .populate('schemaCategory');
  }

  async getServiceSchemaById(id: string) {
    return await this.serviceSchemasModel
      .findById(id)
      .populate('schemaCategory');
  }

  async getServicesSchemasByCategoryId(categoryId: string, instance: string) {
    return await this.serviceSchemasModel
      .find({
        schemaCategory: categoryId,
        instance,
      })
      .populate('schemaCategory');
  }

  async getServicesSchemasByCategoryIdNoInstance(categoryId: string) {
    return await this.serviceSchemasModel.find({ schemaCategory: categoryId });
  }

  async deleteServiceSchemasByCategoryId(categoryId: string) {
    await this.serviceSchemasModel.deleteMany({ schemaCategory: categoryId });
  }

  async getServicesSchemasByCategoryIds(
    categoryIds: string[],
    instance: string,
  ) {
    return await this.serviceSchemasModel.find({
      schemaCategory: { $in: categoryIds },
      instance,
    });
  }

  async createServiceSchema(serviceSchema: ServiceSchemaNoId) {
    const { _id } = await this.serviceSchemasModel.create(serviceSchema);

    return _id;
  }

  async updateServiceSchema(
    id: string,
    newServiceSchema: Partial<ServiceSchemaDto>,
  ) {
    await this.serviceSchemasModel.findOneAndUpdate(
      { _id: id },
      newServiceSchema,
    );
  }

  async deleteServiceSchema(id: string) {
    await this.serviceSchemasModel.findOneAndDelete({ _id: id });
  }

  async searchServiceSchemas(term: string, instance: string) {
    return await this.serviceSchemasModel.find({
      name: { $regex: new RegExp(term, 'i') },
      instance,
    });
  }
}
