import { styled } from '@mui/styles';
import React from 'react';

interface Props {
  url: string;
  alt: string;
}

const Underlay = styled('div')(() => ({
  backgroundColor: 'black',
  width: '100%',
  height: '100%'
}))

export const ImageGalleryItem: React.FC<Props> = ({ url, alt }) => {
  return (
    <Underlay>
      <img
        src={url}
        alt={alt}
        height={500}
      />
    </Underlay>
  )
}
