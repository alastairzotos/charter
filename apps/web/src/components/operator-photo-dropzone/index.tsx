import { Avatar } from '@mui/material';
import React from 'react';
import { ImageDropzone } from '../image-dropzone';

interface Props {
  photo?: string;
  onChange: (url: string) => void;
}

export const OperatorPhotoDropzone: React.FC<Props> = ({ photo, onChange }) => {
  return (
    <ImageDropzone
      multiple={false}
      onReceiveUrls={urls => {
        onChange(urls[0])
      }}
    >
      <Avatar src={photo} sx={{ width: 128, height: 128 }} />
    </ImageDropzone>
  )
}
