import { HttpService } from "./http.service";

export interface IImagesService {
  uploadImage(file: File): Promise<string>;
}

export class ImagesService extends HttpService implements IImagesService {
  async uploadImage(file: File): Promise<string> {
    const formData = new FormData();
    formData.append('file', file);

    const { data } = await this.httpClient.post<any, { data: string }, FormData>(
      '/images',
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