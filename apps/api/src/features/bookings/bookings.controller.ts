import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  BookingDto,
  BookingStatus,
  InstanceDto,
  LoggedInUserDetails,
} from 'dtos';

import { AuthGuard } from 'auth/auth.guard';
import { Principal } from 'decorators/principal.decorator';
import { Roles } from 'auth/roles.decorator';
import { BookingsService } from 'features/bookings/bookings.service';
import { Instance } from 'decorators/instance.decorator';
import { SentryInterceptor } from 'interceptors/sentry.interceptor';

@Controller('bookings')
@UseInterceptors(SentryInterceptor)
@UseGuards(AuthGuard)
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  @Roles('all')
  async createBooking(
    @Instance() instance: InstanceDto,
    @Body() booking: BookingDto,
  ) {
    return await this.bookingsService.createBooking({
      ...booking,
      instance,
    });
  }

  @Get('for-user')
  @Roles('admin', 'operator')
  async getBookingsForUser(@Principal() user: LoggedInUserDetails) {
    return await this.bookingsService.getBookingsForUser(user);
  }

  @Get('all')
  async getBookingsByInstance(@Instance() instance: string) {
    return await this.bookingsService.getBookingsByInstance(instance);
  }

  @Get(':id')
  @Roles('all')
  async getBookingById(@Param('id') id: string) {
    return await this.bookingsService.getBookingById(id);
  }

  @Get('by-ref/:ref')
  @Roles('all')
  async getBookingByRef(@Param('ref') bookingRef: string) {
    return await this.bookingsService.getBookingByRef(bookingRef);
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
