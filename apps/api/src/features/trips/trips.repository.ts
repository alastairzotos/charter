import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TripDto, TripNoId } from 'dtos';
import { Model } from 'mongoose';

import { Trip } from 'schemas/trip.schema';

@Injectable()
export class TripsRepository {
  constructor(
    @InjectModel(Trip.name) private readonly tripsModel: Model<Trip>,
  ) {}

  async getTripsForOperator(operatorId: string) {
    return await this.tripsModel.find({ operator: operatorId });
  }

  async getTrip(id: string) {
    return await this.tripsModel.findById(id);
  }

  async createTrip(trip: TripNoId) {
    const { _id } = await this.tripsModel.create(trip);

    return _id;
  }

  async updateTrip(id: string, newTrip: Partial<TripDto>) {
    return await this.tripsModel.findOneAndUpdate({ _id: id }, newTrip);
  }

  async deleteTrip(id: string) {
    return await this.tripsModel.findOneAndDelete({ _id: id });
  }
}
