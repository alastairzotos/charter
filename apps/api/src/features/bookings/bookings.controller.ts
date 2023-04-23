import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { BookingDto, BookingStatus, LoggedInUserDetails } from 'dtos';

import { AuthGuard } from 'auth/auth.guard';
import { Principal } from 'auth/principal.decorator';
import { Roles } from 'auth/roles.decorator';
import { BookingsService } from 'features/bookings/bookings.service';

@Controller('bookings')
@UseGuards(AuthGuard)
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  @Roles('all')
  async createBooking(@Body() booking: BookingDto) {
    return await this.bookingsService.createBooking(booking);
  }

  @Get('for-user')
  @Roles('admin', 'operator')
  async getBookingsForUser(@Principal() user: LoggedInUserDetails) {
    return await this.bookingsService.getBookingsForUser(user);
  }

  @Get(':id')
  @Roles('all')
  async getBookingById(@Param('id') id: string) {
    return await this.bookingsService.getBookingById(id);
  }

  @Get('readable/:id')
  @Roles('all')
  async getReadableBookingById(@Param('id') id: string) {
    const readableBooking = await this.bookingsService.getReadableBookingById(
      id,
    );

    if (!readableBooking) {
      throw new NotFoundException();
    }

    return readableBooking;
  }

  @Get('with-details/:id')
  @Roles('all')
  async getBookingWithOperatorAndService(@Param('id') id: string) {
    return await this.bookingsService.getBookingWithOperatorAndService(id);
  }

  @Patch()
  async setBookingStatus(
    @Body() { id, status }: { id: string; status: BookingStatus },
  ) {
    await this.bookingsService.setBookingStatus(id, status);
  }

  @Get('payment-status/:id')
  @Roles('all')
  async getBookingPaymentStatus(@Param('id') id: string) {
    return await this.bookingsService.getBookingPaymentStatus(id);
  }

  @Get('by-operator-id/:id')
  async getBookingsByOperatorId(@Param('id') id: string) {
    return await this.bookingsService.getBookingsByOperatorId(id);
  }

  @Post('fulfillment')
  @Roles('admin', 'operator')
  async setBookingFulfillment(
    @Body() { id, fulfilled }: { id: string; fulfilled: boolean },
  ) {
    await this.bookingsService.setBookingFulfillment(id, fulfilled);
  }
}
