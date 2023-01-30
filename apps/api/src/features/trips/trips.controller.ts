import { Body, Controller, Get, Param, Post, Patch, Delete, Query, UseGuards, NotFoundException } from "@nestjs/common";
import { TripDto, TripNoId } from "dtos";
import { AuthGuard } from "../../auth/auth.guard";
import { Roles } from "../../auth/roles.decorator";
import { TripsService } from "./trips.service";

@Controller('trips')
@UseGuards(AuthGuard)
export class TripsController {
  constructor(private readonly tripsService: TripsService) {}

  @Get()
  @Roles('all')
  async getTripsForOperator(
    @Query('operatorId') operatorId: string
  ) {
    return await this.tripsService.getTripsForOperator(operatorId);
  }

  @Get(':id')
  @Roles('all')
  async getTrip(@Param('id') id: string) {
    return await this.tripsService.getTrip(id);
  }

  @Get('with-operator/:id')
  @Roles('all')
  async getTripByIdWithOperator(@Param('id') id: string) {
    try {
      return await this.tripsService.getTripByIdWithOperator(id);
    } catch {
      throw new NotFoundException();
    }
  }

  @Post()
  async createTrip(
    @Body() trip: TripNoId
  ) {
    return await this.tripsService.createTrip(trip);
  }

  @Patch()
  async updateTrip(
    @Body() { id, newTrip }: { id: string, newTrip: Partial<TripDto> }
  ) {
    return await this.tripsService.updateTrip(id, newTrip);
  }

  @Delete()
  async deleteTrip(
    @Body() { id }: { id: string }
  ) {
    return await this.tripsService.deleteTrip(id);
  }
}
