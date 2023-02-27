import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { ServiceSchemaDto } from "dtos";
import { Model } from "mongoose";
import { ServiceSchema } from "schemas/service-schema.schema";

@Injectable()
export class ServiceSchemaRepository {
  constructor(
    @InjectModel(ServiceSchema.name) private readonly serviceSchemasModel: Model<ServiceSchema>,
  ) {}

  async getServiceSchemas() {
    return await this.serviceSchemasModel.find();
  }

  async getServiceSchemaById(id: string) {
    return await this.serviceSchemasModel.findById(id);
  }

  async createServiceSchema(serviceSchema: ServiceSchemaDto) {
    const { _id } = await this.serviceSchemasModel.create(serviceSchema);

    return _id;
  }

  async updateServiceSchema(id: string, newServiceSchema: Partial<ServiceSchemaDto>) {
    await this.serviceSchemasModel.findOneAndUpdate({ _id: id }, newServiceSchema);
  }

  async deleteServiceSchema(id: string) {
    await this.serviceSchemasModel.findOneAndDelete({ _id: id });
  }
}
