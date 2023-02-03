import { OperatorDto, ServiceDto, ServiceNoId } from "dtos";

import { HttpService } from "src/services/http.service";

export class ServicesService extends HttpService {
  async getServicesForOperator(operatorId: string): Promise<ServiceDto[]> {
    const { data } = await this.httpClient.get<ServiceDto[]>(
      `/services?operatorId=${operatorId}`
    );

    return data;
  }

  async getService(id: string): Promise<ServiceDto> {
    const { data } = await this.httpClient.get<ServiceDto>(`/services/${id}`);

    return data;
  }

  async getServiceByIdWithOperator(
    id: string
  ): Promise<{ service: ServiceDto; operator: OperatorDto }> {
    const { data } = await this.httpClient.get<{
      service: ServiceDto;
      operator: OperatorDto;
    }>(`/services/with-operator/${id}`);

    return data;
  }

  async getServicesWithOperatorsByType(type: string): Promise<ServiceDto[]> {
    const { data } = await this.httpClient.get<ServiceDto[]>(
      `/services/by-type/${type}`
    );

    return data;
  }

  async updateService(
    id: string,
    newService: Partial<ServiceNoId>
  ): Promise<void> {
    await this.httpClient.patch<
      any,
      unknown,
      { id: string; newService: Partial<ServiceNoId> }
    >(`/services`, { id, newService });
  }

  async deleteService(id: string): Promise<void> {
    await this.httpClient.delete<any, unknown, { id: string }>("/services", {
      data: { id },
    });
  }

  async createService(service: ServiceNoId): Promise<string> {
    const { data } = await this.httpClient.post<
      any,
      { data: string },
      ServiceNoId
    >("/services", service);

    return data;
  }
}
