import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { TripDto, TripNoId } from "dtos";
import { OperatorsService } from "../operators/operators.service";
import { TripsRepository } from "./trips.repository";

@Injectable()
export class TripsService {
  constructor(
    @Inject(forwardRef(() => OperatorsService))
    private readonly operatorsService: OperatorsService,
    private readonly tripsRepository: TripsRepository
  ) {}

  async getTripsForOperator(operatorId: string) {
    return await this.tripsRepository.getTripsForOperator(operatorId);
  }

  async getTrip(id: string) {
    return await this.tripsRepository.getTrip(id);
  }

  async getTripByIdWithOperator(id: string) {
    const trip = await this.getTrip(id);

    return {
      trip,
      operator: await this.operatorsService.getOperatorById(trip.operator as unknown as string)
    }
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
