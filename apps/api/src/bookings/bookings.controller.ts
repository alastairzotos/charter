import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { BookingDto } from "dtos";
import { AuthGuard } from "../auth/auth.guard";
import { Roles } from "../auth/roles.decorator";
import { BookingsService } from "./bookings.service";

@Controller('bookings')
@UseGuards(AuthGuard)
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  @Roles('all')
  async createBooking(
    @Body() booking: BookingDto
  ) {
    return await this.bookingsService.createBooking(booking);
  }

  @Get('with-details/:id')
  @Roles('all')
  async getBookingWithOperatorAndTrip(
    @Param('id') id: string
  ) {
    return await this.bookingsService.getBookingWithOperatorAndTrip(id);
  }
}
