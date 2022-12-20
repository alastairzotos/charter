import { Typography, CircularProgress } from '@mui/material';
import { styled, keyframes } from '@mui/material';
import React, { useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { useImagesState } from '../../state/images';

interface Props {
  multiple?: boolean;
  onReceiveUrls: (urls: string[]) => void;
}

const barberpole = keyframes`
  100% {
    background-position: 100% 100%;
  }
`

export const ImageDropper = styled('div')<{ active: boolean }>(({ theme, active }) => ({
  border: `1px solid ${theme.palette.divider}`,
  padding: theme.spacing(2),
  margin: theme.spacing(2),
  width: '20%',

  background: `repeating-linear-gradient(125deg, #ffffff, #ffffff 10px, #d9d9d9 10px, #d9d9d9 20px)`,
  backgroundSize: '200% 200%',

  animation: active ? `${barberpole} 20s linear infinite` : '',
}))


export const ImageDropzone: React.FC<React.PropsWithChildren<Props>> = ({ multiple = true, onReceiveUrls, children }) => {
  const [uploadState, uploadImages, uploadStatus] = useImagesState(s => [s.uploadState, s.uploadImages, s.uploadStatus]);

  const uploading = uploadStatus === 'fetching';
  const urls = Object.values(uploadState || {}).map(s => s.url).filter(i => !!i) as string[];

  useEffect(() => {
    if (urls.length > 0) {
      onReceiveUrls(urls);
    }
  }, [urls.length]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    uploadImages(acceptedFiles);
  }, [])

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
    onDrop,
    multiple,
    disabled: uploading,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.JPEG', '.JPG', '.PNG']
    }
  })

  return (
    <div {...getRootProps()}>
      {children}

      <input {...getInputProps()} />

      <ImageDropper active={isDragActive || uploading}>
        <Typography color={uploading ? 'gray' : undefined}>
          {
            uploading
              ? <CircularProgress size={20} color="secondary" />
              : (
                acceptedFiles.length > 0
                  ? acceptedFiles.length > 1 ? `${acceptedFiles.length} images selected` : acceptedFiles[0].name
                  : `Drop image${multiple ? 's' : ''} here`
              )
          }
        </Typography>

        {uploadStatus === 'error' && <Typography>There was an error</Typography>}
      </ImageDropper>
    </div>
  )
}
