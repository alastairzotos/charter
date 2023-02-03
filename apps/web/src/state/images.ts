import { ImagesService } from "src/services/images.service";
import { createSlice } from "src/state/resource-slice";

const svc = new ImagesService();

export const useUploadImages = createSlice<
  void,
  [file: File[], onDone: (urls: string[]) => void]
>(null, async (files, onDone) => {
  const urls: string[] = [];

  for (const file of files) {
    urls.push(await svc.uploadImage(file));
  }

  onDone(urls);
});
