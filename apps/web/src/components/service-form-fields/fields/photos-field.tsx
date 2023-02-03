import { ErrorMessage } from "formik";
import React from "react";

import { FileUpload } from "src/components/file-upload";
import { ServiceFieldProps } from "src/components/service-form-fields/fields/props";

export const PhotosField: React.FC<ServiceFieldProps> = ({
  field: { field, label },
  values,
  isSubmitting,
  setValues,
}) => {
  const dataPhotos = values.data[field] as string[];

  return (
    <>
      <FileUpload
        title={label}
        filesLimit={100}
        acceptedFiles={["image/jpeg", "image/png", "image/bmp"]}
        disabled={isSubmitting}
        value={dataPhotos}
        onChange={(photos) =>
          setValues({
            ...(values as any),
            data: {
              ...values.data,
              photos: [...dataPhotos, ...photos],
            },
          })
        }
        onDelete={(item) =>
          setValues({
            ...(values as any),
            data: {
              ...values.data,
              photos: dataPhotos.filter((photo) => photo !== item),
            },
          })
        }
      />
      <ErrorMessage name={field} />
    </>
  );
};
