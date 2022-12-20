import { Module } from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose';
import { EnvModule } from "../environment/environment.module";
import { S3Module } from "../s3/s3.module";
import { Operator, OperatorSchema } from "../schemas/operator.schema";
import { UsersModule } from "../users/users.module";
import { OperatorsController } from "./operators.controller";
import { OperatorsRepository } from "./operators.repository";
import { OperatorsService } from "./operators.service";

@Module({
  imports: [
    UsersModule,
    EnvModule,
    S3Module,
    MongooseModule.forFeature([
      { name: Operator.name, schema: OperatorSchema }
    ]),
  ],
  controllers: [OperatorsController],
  providers: [OperatorsService, OperatorsRepository],
  exports: [OperatorsService],
})
export class OperatorsModule {}
