import create from 'zustand';
import { FetchStatus } from '../../models';
import { ImagesService } from '../../services/images.service';

export interface ImagesStateValues {
  uploadStatus?: FetchStatus;
  uploadState?: { [key: string]: { status?: FetchStatus, url?: string } };
}

export interface ImagesStateActions {
  uploadImages: (files: File[]) => Promise<void>;
}

export type ImagesState = ImagesStateValues & ImagesStateActions;

export const createImagesState = (initialValues: ImagesStateValues, imagesService: Pick<ImagesService, keyof ImagesService>) =>
  create<ImagesState>((set, self) => ({
    ...initialValues,

    uploadImages: async (files) => {
      set({ uploadState: {}, uploadStatus: 'fetching' });

      for (const file of files) {
        try {
          set({
            uploadState: {
              ...self().uploadState,
              [file.name]: {
                status: 'fetching'
              }
            }
          })

          const url = await imagesService.uploadImage(file);

          set({
            uploadState: {
              ...self().uploadState,
              [file.name]: {
                status: 'success',
                url
              }
            }
          })
        } catch {
          set({
            uploadState: {
              ...self().uploadState,
              [file.name]: {
                status: 'error'
              }
            }
          })
        }
      }

      set({ uploadStatus: 'success' });
    }
  }));

export const useImagesState = createImagesState(
  {},
  new ImagesService()
)
