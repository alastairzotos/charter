import { httpClient } from "src/services/http.service";

export class ImagesService {
  async uploadImage(file: File): Promise<string> {
    const formData = new FormData();
    formData.append("file", file);

    const { data } = await httpClient.post<
      any,
      { data: string },
      FormData
    >("/images", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return data;
  }
}
