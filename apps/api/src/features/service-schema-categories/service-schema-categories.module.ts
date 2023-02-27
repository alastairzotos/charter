import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { EnvModule } from "environment/environment.module";
import { ServiceSchemaCategoryController } from "features/service-schema-categories/service-schema-categories.controller";
import { ServiceSchemaCategoryRepository } from "features/service-schema-categories/service-schema-categories.repository";
import { ServiceSchemaCategoryService } from "features/service-schema-categories/service-schema-categories.service";
import { UsersModule } from "features/users/users.module";
import { ServiceSchemaCategory, ServiceSchemaCategorySchema } from "schemas/service-schema-category.schema";

@Module({
  imports: [
    UsersModule,
    EnvModule,
    MongooseModule.forFeature([{ name: ServiceSchemaCategory.name, schema: ServiceSchemaCategorySchema }]),
  ],
  controllers: [ServiceSchemaCategoryController],
  providers: [ServiceSchemaCategoryService, ServiceSchemaCategoryRepository],
  exports: [ServiceSchemaCategoryService],
})
export class ServiceSchemaCategoriesModule {}
