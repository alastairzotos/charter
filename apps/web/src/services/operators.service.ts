import { OperatorDto, OperatorNoId } from "dtos";
import { HttpService } from "./http.service";

export interface IOperatorsService {
  getOperators(): Promise<OperatorDto[]>;
  getOperator(id: string): Promise<OperatorDto>;
  createOperator(operator: OperatorNoId): Promise<string>;
  updateOperator(id: string, newOperator: Partial<OperatorDto>): Promise<void>;
  deleteOperator(id: string): Promise<void>;
  uploadPhoto(file: File): Promise<string>;
}

export class OperatorsService extends HttpService implements IOperatorsService {
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

  async uploadPhoto(photo: File): Promise<string> {
    const formData = new FormData();
    formData.append('file', photo);

    const { data } = await this.httpClient.post<any, { data: string }, FormData>(
      '/operators/photo',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    );

    return data;
  }
}
