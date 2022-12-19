import { TripDto, TripNoId } from "dtos";
import { HttpService } from "./http.service";

export interface ITripsService {
  getTripsForOperator(operatorId: string): Promise<TripDto[]>;
  getTrip(id: string): Promise<TripDto>;
  updateTrip(id: string, newTrip: Partial<TripNoId>): Promise<void>;
  deleteTrip(id: string): Promise<void>;
  createTrip(trip: TripNoId): Promise<string>;
}

export class TripsService extends HttpService implements ITripsService {
  async getTripsForOperator(operatorId: string): Promise<TripDto[]> {
    const { data } = await this.httpClient.get<TripDto[]>(`/trips?operatorId=${operatorId}`);

    return data;
  }

  async getTrip(id: string): Promise<TripDto> {
    const { data } = await this.httpClient.get<TripDto>(`/trips/${id}`);
    
    return data;
  }

  async updateTrip(id: string, newTrip: Partial<TripNoId>): Promise<void> {
    await this.httpClient.patch<any, {}, { id: string, newTrip: Partial<TripNoId>}>(`/trips`, { id, newTrip });
  }

  async deleteTrip(id: string): Promise<void> {
    await this.httpClient.delete<any, {}, { id: string }>('/trips', { data: { id }});
  }

  async createTrip(trip: TripNoId): Promise<string> {
    const { data } = await this.httpClient.post<any, { data: string }, TripNoId>('/trips', trip);

    return data;
  }
}
