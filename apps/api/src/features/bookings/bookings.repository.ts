import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BookingNoId, BookingPaymentStatus, BookingStatus, OperatorDto } from 'dtos';
import { Model } from 'mongoose';

import { Booking } from 'schemas/booking.schema';

@Injectable()
export class BookingsRepository {
  constructor(
    @InjectModel(Booking.name) private readonly bookingsModel: Model<Booking>,
  ) { }

  async createBooking(booking: BookingNoId) {
    return await this.bookingsModel.create(booking);
  }

  async setBookingPaymentIntentId(id: string, paymentIntentId: string) {
    await this.bookingsModel.findOneAndUpdate({ _id: id }, { paymentIntentId });
  }

  async setBookingSetupIntentIdAndStripeCustomerId(id: string, setupIntentId: string, stripeCustomerId: string) {
    await this.bookingsModel.findOneAndUpdate({ _id: id }, { setupIntentId, stripeCustomerId });
  }

  async setBookingPaymentStatus(id: string, paymentStatus: BookingPaymentStatus) {
    await this.bookingsModel.findOneAndUpdate({ _id: id }, { paymentStatus });
  }

  async getBookingPaymentStatus(id: string) {
    const booking = await this.bookingsModel.findOne({ _id: id })
    return booking.paymentStatus;
  }

  async getBookingById(id: string) {
    return await this.bookingsModel.findById(id)
      .populate('operator')
      .populate({
        path: 'service',
        populate: {
          path: 'serviceSchema'
        }
      })
  }

  async getBookingByPaymentIntentId(paymentIntentId: string) {
    return await this.bookingsModel.findOne({ paymentIntentId })
      .populate('operator')
      .populate({
        path: 'service',
        populate: {
          path: 'serviceSchema'
        }
      });
  }

  async getBookingBySetupIntentId(setupIntentId: string) {
    return await this.bookingsModel.findOne({ setupIntentId })
      .populate('operator')
      .populate({
        path: 'service',
        populate: {
          path: 'serviceSchema'
        }
      });
  }

  async getBookingWithOperatorAndService(id: string) {
    return await this.bookingsModel.findById(id)
      .populate('operator')
      .populate({
        path: 'service',
        populate: {
          path: 'serviceSchema'
        }
      });
  }

  async getBookingsByOperator(operator: OperatorDto) {
    return await this.bookingsModel.find({ operator }).populate('service');
  }

  async getBookingsByOperatorId(id: string) {
    return await this.bookingsModel.find({ operator: id, paymentStatus: 'succeeded' })
      .populate({
        path: 'service',
        populate: {
          path: 'serviceSchema'
        }
      });
  }

  async setBookingStatus(id: string, status: BookingStatus) {
    await this.bookingsModel.findOneAndUpdate({ _id: id }, { status, paymentStatus: status === 'rejected' && 'cancelled' });
  }
}
