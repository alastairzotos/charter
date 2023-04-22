import { createQuery } from "@bitmetro/create-query";

import { uploadImage } from "clients/images.client";

export const useUploadImages = createQuery(
  async (files: File[], onDone: (urls: string[]) => void) => {
    const urls: string[] = [];

    for (const file of files) {
      urls.push(await uploadImage(file));
    }

    onDone(urls);
  }
);
