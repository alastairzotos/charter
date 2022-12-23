import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { BookingNoId } from "dtos";
import { Model } from "mongoose";
import { Booking } from "../schemas/booking.schema";

@Injectable()
export class BookingsRepository {
  constructor(@InjectModel(Booking.name) private readonly bookingsModel: Model<Booking>) {}

  async createBooking(booking: BookingNoId) {
    const { _id } = await this.bookingsModel.create(booking);

    return _id;
  }

  async getBookingWithOperatorAndTrip(id: string) {
    return await this.bookingsModel.findById(id).populate(['operator', 'trip']);
  }
}
