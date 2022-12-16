import { Module } from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose';
import { Operator, OperatorSchema } from "../schemas/operator.schema";
import { OperatorsController } from "./operators.controller";
import { OperatorsRepository } from "./operators.repository";
import { OperatorsService } from "./operators.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Operator.name, schema: OperatorSchema }
    ]),
  ],
  controllers: [OperatorsController],
  providers: [OperatorsService, OperatorsRepository],
  exports: [OperatorsService],
})
export class OperatorsModule {}
