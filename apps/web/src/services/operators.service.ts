import { OperatorDto, OperatorNoId } from "dtos";
import { HttpService } from "./http.service";

export class OperatorsService extends HttpService {
  async getOperators(): Promise<OperatorDto[]> {
    const { data } = await this.httpClient.get<OperatorDto[]>('/operators');

    return data;
  }

  async getOperator(id: string): Promise<OperatorDto> {
    const { data } = await this.httpClient.get<OperatorDto>(`/operators/${id}`);

    return data;
  }

  async createOperator(operator: OperatorNoId): Promise<string> {
    const { data } = await this.httpClient.post<any, { data: string }, OperatorNoId>('/operators', operator);

    return data;
  }

  async updateOperator(id: string, newOperator: Partial<OperatorDto>): Promise<void> {
    await this.httpClient.patch<any, {}, { id: string, newOperator: Partial<OperatorDto> }>('/operators', { id, newOperator });
  }

  async deleteOperator(id: string): Promise<void> {
    await this.httpClient.delete<any, {}, { id: string }>('/operators', { data: { id } });
  }
}
