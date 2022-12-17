import { Controller, Get, Post, Patch, Delete, Body, UseGuards } from "@nestjs/common";
import { OperatorDto } from "dtos";
import { AuthGuard } from "../auth/auth.guard";
import { Roles } from "../auth/roles.decorator";
import { OperatorsService } from "./operators.service";

@Controller('operators')
@UseGuards(AuthGuard)
export class OperatorsController {
  constructor(private readonly operatorsService: OperatorsService) {}

  @Get()
  @Roles('all')
  async getOperators() {
    return await this.operatorsService.getOperators();
  }

  @Post()
  async createOperator(
    @Body() operator: OperatorDto,
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
