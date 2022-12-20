import { Controller, Get, Post, Patch, Delete, Body, UseGuards, Param, UseInterceptors, UploadedFile} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { Express } from 'express';
import { OperatorDto, OperatorNoId } from "dtos";
import { AuthGuard } from "../auth/auth.guard";
import { Roles } from "../auth/roles.decorator";
import { OperatorsService } from "./operators.service";

@Controller('operators')
@UseGuards(AuthGuard)
export class OperatorsController {
  constructor(private readonly operatorsService: OperatorsService) {}

  @Post('/photo')
  @UseInterceptors(FileInterceptor('file'))
  async uploadPhoto(@UploadedFile() file: Express.Multer.File) {
    return await this.operatorsService.uploadPhoto(file.buffer);
  }

  @Get()
  @Roles('all')
  async getOperators() {
    return await this.operatorsService.getOperators();
  }

  @Get(':id')
  @Roles('all')
  async getOperatorById(@Param('id') id: string) {
    return await this.operatorsService.getOperatorById(id);
  }

  @Post()
  async createOperator(
    @Body() operator: OperatorNoId,
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
