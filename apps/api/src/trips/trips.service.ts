import { Injectable } from "@nestjs/common";
import { TripDto, TripNoId } from "dtos";
import { TripsRepository } from "./trips.repository";

@Injectable()
export class TripsService {
  constructor(private readonly tripsRepository: TripsRepository) {}

  async getTripsForOperator(operatorId: string) {
    return await this.tripsRepository.getTripsForOperator(operatorId);
  }

  async getTrip(id: string) {
    return await this.tripsRepository.getTrip(id);
  }

  async createTrip(trip: TripNoId) {
    return await this.tripsRepository.createTrip(trip);
  }
  
  async updateTrip(id: string, newTrip: Partial<TripDto>) {
    return await this.tripsRepository.updateTrip(id, newTrip);
  }

  async deleteTrip(id: string) {
    return await this.tripsRepository.deleteTrip(id);
  }
}
