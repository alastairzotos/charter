import {
  Button,
  CircularProgress,
  ImageList,
  SxProps,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { DropzoneDialog } from "react-mui-dropzone";
import { Titled } from "ui";

import { FileUploadItem } from "components/_core/file-upload/item";
import { Surface } from "components/_core/surface";
import { useUploadImages } from "state/images";
import { pluralize } from "util/misc";

interface Props {
  sx?: SxProps;
  disabled?: boolean;
  title: string;
  acceptedFiles?: string[];
  maxFileSize?: number;
  filesLimit?: number;
  value: string[];
  onChange: (urls: string[]) => void;
  onDelete?: (item: string) => void;
}

export const FileUpload: React.FC<Props> = ({
  sx,
  disabled,
  title,
  acceptedFiles,
  maxFileSize = 100000,
  filesLimit = 1,
  value,
  onChange,
  onDelete,
}) => {
  const [open, setOpen] = useState(false);

  const [uploadStatus, uploadImages] = useUploadImages((s) => [
    s.status,
    s.request,
  ]);

  return (
    <Surface sx={{ ...sx, p: 2 }}>
      <Titled title={title}>
        {uploadStatus === "fetching" && <CircularProgress />}

        {value.length > 0 && (
          <ImageList sx={{ maxWidth: 500 }} cols={3} rowHeight={164}>
            {value.map((item) => (
              <FileUploadItem
                key={item}
                onDelete={!!onDelete ? () => onDelete(item) : undefined}
              >
                <img
                  src={`${item}?w=164&h=164&fit=crop&auto=format`}
                  loading="lazy"
                />
              </FileUploadItem>
            ))}
          </ImageList>
        )}

        {value.length === 0 && <Typography>No files uploaded</Typography>}

        <Button disabled={disabled} onClick={() => setOpen(true)}>
          {pluralize(filesLimit, "Upload file")}
        </Button>

        <DropzoneDialog
          open={open}
          onClose={() => setOpen(false)}
          acceptedFiles={acceptedFiles}
          showPreviews={true}
          maxFileSize={maxFileSize}
          filesLimit={filesLimit}
          onSave={(files) => {
            setOpen(false);
            uploadImages(files, onChange);
          }}
        />
      </Titled>
    </Surface>
  );
};
