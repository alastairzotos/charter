import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  BookingNoId,
  BookingPaymentStatus,
  BookingStatus,
  OperatorDto,
  SetupIntentStatus,
} from 'dtos';
import { Document, Model, Query } from 'mongoose';

import { Booking } from 'schemas/booking.schema';

@Injectable()
export class BookingsRepository {
  constructor(
    @InjectModel(Booking.name) private readonly bookingsModel: Model<Booking>,
  ) {}

  async createBooking(booking: BookingNoId) {
    return await this.bookingsModel.create(booking);
  }

  async setBookingPaymentIntentId(id: string, paymentIntentId: string) {
    await this.bookingsModel.findOneAndUpdate({ _id: id }, { paymentIntentId });
  }

  async setBookingSetupIntentIdAndStripeCustomerId(
    id: string,
    setupIntentId: string,
    stripeCustomerId: string,
  ) {
    await this.bookingsModel.findOneAndUpdate(
      { _id: id },
      { setupIntentId, stripeCustomerId },
    );
  }

  async setBookingSetupIntentStatus(
    id: string,
    setupIntentStatus: SetupIntentStatus,
  ) {
    await this.bookingsModel.findOneAndUpdate(
      { _id: id },
      { setupIntentStatus },
    );
  }

  async setBookingPaymentStatus(
    id: string,
    paymentStatus: BookingPaymentStatus,
  ) {
    await this.bookingsModel.findOneAndUpdate({ _id: id }, { paymentStatus });
  }

  async getBookingPaymentStatus(id: string) {
    const booking = await this.bookingsModel.findOne({ _id: id });
    return booking.paymentStatus;
  }

  async getBookingById(id: string) {
    return await this.populateOperatorServiceAndInstance(
      this.bookingsModel.findById(id),
    );
  }

  async getBookingByRef(bookingRef: string) {
    return await this.populateOperatorServiceAndInstance(
      this.bookingsModel.findOne({ bookingRef }),
    );
  }

  async getBookingByPaymentIntentId(paymentIntentId: string) {
    return await this.populateOperatorServiceAndInstance(
      this.bookingsModel.findOne({ paymentIntentId }),
    );
  }

  async getBookingBySetupIntentId(setupIntentId: string) {
    return await this.populateOperatorServiceAndInstance(
      this.bookingsModel.findOne({ setupIntentId }),
    );
  }

  async getBookingWithOperatorAndService(id: string) {
    return await this.populateOperatorServiceAndInstance(
      this.bookingsModel.findById(id),
    );
  }

  async getBookingsByOperator(operator: OperatorDto) {
    return await this.populateOperatorAndService(
      this.bookingsModel.find({ operator }),
    );
  }

  async getBookingsByOperatorId(id: string) {
    return await this.populateOperatorAndService(
      this.bookingsModel.find({ operator: id }),
    );
  }

  async getBookingsByInstance(instance: string) {
    return await this.populateOperatorAndService(
      this.bookingsModel.find({ instance }),
    );
  }

  async setBookingStatus(id: string, status: BookingStatus) {
    await this.bookingsModel.findOneAndUpdate(
      { _id: id },
      { status, paymentStatus: status === 'rejected' && 'cancelled' },
    );
  }

  async setBookingFulfillment(id: string, fulfilled: boolean) {
    await this.bookingsModel.findOneAndUpdate({ _id: id }, { fulfilled });
  }

  async deleteBookingsForService(serviceId: string) {
    await this.bookingsModel.deleteMany({ service: serviceId });
  }

  private async populateService(
    doc: Query<
      (Document<unknown, any, Booking> & Booking & Required<{ _id: string }>)[],
      Document<unknown, any, Booking> & Booking & Required<{ _id: string }>,
      {},
      Booking
    >,
  ) {
    return await doc.populate({
      path: 'service',
      populate: {
        path: 'serviceSchema',
      },
    });
  }

  private async populateOperatorAndService(
    doc: Query<
      (Document<unknown, any, Booking> & Booking & Required<{ _id: string }>)[],
      Document<unknown, any, Booking> & Booking & Required<{ _id: string }>,
      {},
      Booking
    >,
  ) {
    return await doc
      .populate({
        path: 'operator',
        populate: {
          path: 'owner',
        },
      })
      .populate({
        path: 'service',
        populate: {
          path: 'serviceSchema',
        },
      });
  }

  private async populateOperatorServiceAndInstance(
    doc: Query<
      Document<unknown, any, Booking> & Booking & Required<{ _id: string }>,
      Document<unknown, any, Booking> & Booking & Required<{ _id: string }>,
      {},
      Booking
    >,
  ) {
    return await doc
      .populate({
        path: 'operator',
        populate: {
          path: 'owner',
        },
      })
      .populate({
        path: 'service',
        populate: {
          path: 'serviceSchema',
        },
      })
      .populate('instance');
  }
}
