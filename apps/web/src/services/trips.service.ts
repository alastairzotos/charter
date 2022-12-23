import { OperatorDto, TripDto, TripNoId } from "dtos";
import { HttpService } from "./http.service";

export class TripsService extends HttpService {
  async getTripsForOperator(operatorId: string): Promise<TripDto[]> {
    const { data } = await this.httpClient.get<TripDto[]>(`/trips?operatorId=${operatorId}`);

    return data;
  }

  async getTrip(id: string): Promise<TripDto> {
    const { data } = await this.httpClient.get<TripDto>(`/trips/${id}`);
    
    return data;
  }

  async getTripByIdWithOperator(id: string): Promise<{ trip: TripDto, operator: OperatorDto }> {
    const { data } = await this.httpClient.get<{ trip: TripDto, operator: OperatorDto }>(`/trips/with-operator/${id}`);
    
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
