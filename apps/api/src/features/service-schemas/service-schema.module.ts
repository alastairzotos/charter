import { forwardRef, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { EnvModule } from "environment/environment.module";
import { ServiceSchemaController } from "features/service-schemas/service-schema.controller";
import { ServiceSchemaRepository } from "features/service-schemas/service-schema.repository";
import { ServiceSchemaService } from "features/service-schemas/service-schema.service";
import { ServicesModule } from "features/services/services.module";
import { UsersModule } from "features/users/users.module";
import { ServiceSchema, ServiceSchemaSchema } from "schemas/service-schema.schema";

@Module({
  imports: [
    EnvModule,
    UsersModule,
    forwardRef(() => ServicesModule),
    MongooseModule.forFeature([{ name: ServiceSchema.name, schema: ServiceSchemaSchema }]),
  ],
  controllers: [ServiceSchemaController],
  providers: [ServiceSchemaService, ServiceSchemaRepository],
  exports: [ServiceSchemaService],
})
export class ServiceSchemaModule {}
