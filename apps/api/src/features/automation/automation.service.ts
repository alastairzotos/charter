import { Injectable, Logger } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import * as dayjs from 'dayjs';
import { CronJob } from 'cron';

import { BookingDto, InstanceDto } from 'dtos';
import { EnvService } from 'environment/environment.service';
import { BookingsService } from 'features/bookings/bookings.service';
import { BroadcastService } from 'features/broadcast/broadcast.service';
import { InstancesService } from 'features/instances/instances.service';

@Injectable()
export class AutomationService {
  private readonly logger = new Logger(AutomationService.name);

  constructor(
    private readonly schedulerRegistry: SchedulerRegistry,
    private readonly instancesService: InstancesService,
    private readonly bookingsService: BookingsService,
    private readonly broadcastService: BroadcastService,
    private readonly envService: EnvService,
  ) {
    const daily = new CronJob(
      '0 09 * * *',
      async () => await this.performDailyAutomations(),
      null,
      false,
      this.envService.get().timezone,
    );

    const hourly = new CronJob(
      '0 0-23/1 * * *',
      async () => await this.performHourlyAutomations(),
      null,
      false,
      this.envService.get().timezone,
    );

    this.schedulerRegistry.addCronJob('daily', daily);
    this.schedulerRegistry.addCronJob('hourly', hourly);

    daily.start();
    hourly.start();
  }

  async performDailyAutomations() {
    this.logger.log('Performing daily automations...');
    const instances = await this.instancesService.getInstances();

    await Promise.all(
      instances.map((instance) =>
        this.performDailyAutomationsOnInstance(instance),
      ),
    );
  }

  async performHourlyAutomations() {
    this.logger.log('Performing hourly automations...');
    const instances = await this.instancesService.getInstances();

    await Promise.all(
      instances.map((instance) =>
        this.performHourlyAutomationsOnInstance(instance),
      ),
    );
  }

  private async performDailyAutomationsOnInstance(instance: InstanceDto) {
    const allBookings = await this.bookingsService.getBookingsByInstance(
      instance._id,
    );

    await Promise.all([this.handleBookingReminders(allBookings)]);
  }

  async performHourlyAutomationsOnInstance(instance: InstanceDto) {
    const allBookings = await this.bookingsService.getBookingsByInstance(
      instance._id,
    );

    await Promise.all([this.handleExpiredBookings(allBookings)]);
  }

  private async handleBookingReminders(allBookings: BookingDto[]) {
    const { filterPending, filterExpired } = this.getBookingFilters();

    const pendingBookings = allBookings
      .filter(filterPending)
      .filter((booking) => !filterExpired(booking));

    await Promise.all(
      pendingBookings.map((booking) =>
        this.broadcastService.broadcastPendingBookingReminder(booking),
      ),
    );
  }

  private async handleExpiredBookings(allBookings: BookingDto[]) {
    const { filterPending, filterExpired } = this.getBookingFilters();

    const expiredBookings = allBookings
      .filter(filterPending)
      .filter(filterExpired);

    await Promise.all(
      expiredBookings.map((booking) =>
        this.bookingsService.cancelExpiredBooking(booking),
      ),
    );
  }

  private getBookingFilters() {
    const timezone = this.envService.get().timezone;

    const today = dayjs().tz(timezone).local();

    const bookingDayjs = (booking: BookingDto) =>
      dayjs(`${booking.date}, ${booking.time}`, 'DD MMM YYYY, HH:mm')
        .tz(timezone)
        .local();

    const filterPending = (booking: BookingDto) =>
      booking.status === 'pending' && booking.setupIntentStatus === 'succeeded';
    const filterExpired = (booking: BookingDto) =>
      !bookingDayjs(booking).isAfter(today);

    return { filterPending, filterExpired };
  }
}
