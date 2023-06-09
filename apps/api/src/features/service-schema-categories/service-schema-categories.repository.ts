import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ServiceSchemaCategoryDto, ServiceSchemaCategoryNoId } from 'dtos';
import { Model } from 'mongoose';
import { ServiceSchemaCategory } from 'schemas/service-schema-category.schema';

@Injectable()
export class ServiceSchemaCategoryRepository {
  constructor(
    @InjectModel(ServiceSchemaCategory.name)
    private readonly model: Model<ServiceSchemaCategory>,
  ) {}

  async getServiceSchemaCategories(instance: string) {
    return await this.model.find({ instance, hidden: { $ne: true } });
  }

  async getServiceSchemaCategoriesIncludingHidden(instance: string) {
    return await this.model.find({ instance });
  }

  async getServiceSchemaCategoryById(id: string) {
    return await this.model.findById(id);
  }

  async createServiceSchemaCategory(category: ServiceSchemaCategoryNoId) {
    const { _id } = await this.model.create(category);

    return _id;
  }

  async updateServiceSchemaCategory(
    id: string,
    newSchemaServiceCategory: Partial<ServiceSchemaCategoryDto>,
  ) {
    await this.model.findOneAndUpdate({ _id: id }, newSchemaServiceCategory);
  }

  async deleteServiceSchemaCategory(id: string) {
    await this.model.findOneAndDelete({ _id: id });
  }

  async searchServiceSchemaCategories(term: string, instance: string) {
    return await this.model.find({
      $and: [{ instance }, { pluralName: { $regex: new RegExp(term, 'i') } }],
    });
  }
}
