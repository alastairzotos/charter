import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BookingNoId, BookingPaymentStatus, BookingStatus, OperatorDto } from 'dtos';
import { Model } from 'mongoose';

import { Booking } from 'schemas/booking.schema';

@Injectable()
export class BookingsRepository {
  constructor(
    @InjectModel(Booking.name) private readonly bookingsModel: Model<Booking>,
  ) {}

  async createBooking(booking: BookingNoId) {
    return await this.bookingsModel.create({
      ...booking,
      status: 'confirmed',
      bookingDate: Date.now(),
      paymentStatus: 'pending',
    });
  }

  async setBookingPaymentIntentId(id: string, paymentIntentId: string) {
    await this.bookingsModel.findOneAndUpdate({ _id: id }, { paymentIntentId });
  }

  async setBookingPaymentStatus(id: string, paymentStatus: BookingPaymentStatus) {
    await this.bookingsModel.findOneAndUpdate({ _id: id }, { paymentStatus });
  }

  async getBookingPaymentStatus(id: string) {
    const { paymentStatus } = await this.bookingsModel.findOne({ _id: id })
    return paymentStatus;
  }

  async getBookingById(id: string) {
    return await this.bookingsModel.findById(id).populate('service');
  }

  async getBookingByPaymentIntentId(paymentIntentId: string) {
    return await this.bookingsModel.findOne({ paymentIntentId });
  }

  async getBookingWithOperatorAndService(id: string) {
    return await this.bookingsModel.findById(id).populate(['operator', 'service']);
  }

  async getBookingsByOperator(operator: OperatorDto) {
    return await this.bookingsModel.find({ operator, paymentStatus: 'succeeded' }).populate('service');
  }

  async setBookingStatus(id: string, status: BookingStatus) {
    await this.bookingsModel.findOneAndUpdate({ _id: id }, { status });
  }
}
