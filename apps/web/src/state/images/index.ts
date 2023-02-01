import create from "zustand";

import { FetchStatus } from "src/models";
import { ImagesService } from "src/services/images.service";

export interface ImagesStateValues {
  uploadStatus?: FetchStatus;
}

export interface ImagesStateActions {
  uploadImages: (
    files: File[],
    onDone: (urls: string[]) => void,
  ) => Promise<void>;
}

export type ImagesState = ImagesStateValues & ImagesStateActions;

export const createImagesState = (
  initialValues: ImagesStateValues,
  imagesService: Pick<ImagesService, keyof ImagesService>
) =>
  create<ImagesState>((set) => ({
    ...initialValues,

    uploadImages: async (files, onDone) => {
      set({ uploadStatus: "fetching" });
      const urls: string[] = [];

      for (const file of files) {
        urls.push(await imagesService.uploadImage(file));
      }

      set({ uploadStatus: "success" });
      onDone(urls);
    },
  }));

export const useImagesState = createImagesState({}, new ImagesService());
