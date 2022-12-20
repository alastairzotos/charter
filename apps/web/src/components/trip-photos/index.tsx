import { Typography } from '@mui/material';
import React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { ImageDropzone } from '../image-dropzone';

interface Props {
  photos: string[];
  onChange: (onReceiveUrls: string[]) => void;
}

export const TripPhotos: React.FC<Props> = ({ photos, onChange }) => {
  return (
    <>
      <Typography variant="h6">Photos</Typography>

      <ImageDropzone multiple onReceiveUrls={onChange}>
        <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
          {photos.map(photo => (
            <ImageListItem key={photo}>
              <img src={`${photo}?w=164&h=164&fit=crop&auto=format`} loading="lazy" />
            </ImageListItem>
          ))}
        </ImageList>
      </ImageDropzone>
    </>
  )
};
