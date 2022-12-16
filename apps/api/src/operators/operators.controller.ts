import { Controller, Get, Post, Patch, Delete, Body } from "@nestjs/common";
import { OperatorDto } from "dtos";
import { OperatorsService } from "./operators.service";

@Controller('operators')
export class OperatorsController {
  constructor(private readonly operatorsService: OperatorsService) {}

  @Get()
  async getOperators() {
    return await this.operatorsService.getOperators();
  }

  @Post()
  async createOperator(
    @Body() operator: OperatorDto
  ) {
    return await this.operatorsService.createOperator(operator);
  }

  @Patch()
  async updateOperator(
    @Body() {
      id,
      newOperator,
    }: {
      id: string,
      newOperator: Partial<OperatorDto>
    }
  ) {
    await this.operatorsService.updateOperator(id, newOperator);
  }

  @Delete()
  async deleteOperator(
    @Body() { id }: { id: string }
  ) {
    await this.operatorsService.deleteOperator(id);
  }
}
