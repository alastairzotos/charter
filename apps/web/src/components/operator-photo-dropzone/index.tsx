import { Avatar, styled, keyframes, Typography, CircularProgress } from '@mui/material';
import { OperatorNoId } from 'dtos';
import React, { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useOperatorsState } from '../../state/operators';

interface Props {
  operator: OperatorNoId;
  onReceiveUrl: (id: string) => void;
}

const barberpole = keyframes`
  100% {
    background-position: 100% 100%;
  }
`

const Dropper = styled('div')<{ active: boolean }>(({ theme, active }) => ({
  border: `1px solid ${theme.palette.divider}`,
  padding: theme.spacing(2),
  margin: theme.spacing(2),
  width: '20%',

  background: `repeating-linear-gradient(125deg, #ffffff, #ffffff 10px, #d9d9d9 10px, #d9d9d9 20px)`,
  backgroundSize: '200% 200%',

  animation: active ? `${barberpole} 20s linear infinite` : '',
}))

export const OperatorPhotoDropzone: React.FC<Props> = ({ operator, onReceiveUrl }) => {
  const [uploadPhotoStatus, uploadPhoto, uploadedPhotoId] = useOperatorsState(s => [s.uploadPhotoStatus, s.uploadPhoto, s.uploadedPhotoId]);

  const uploading = uploadPhotoStatus === 'fetching';

  useEffect(() => {
    if (!!uploadedPhotoId) {
      onReceiveUrl(uploadedPhotoId);
    }
  }, [uploadedPhotoId]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    uploadPhoto(acceptedFiles[0]);
  }, [])

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
    onDrop,
    multiple: false,
    disabled: uploading,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png']
    }
  })

  return (
    <div {...getRootProps()}>
      <Avatar
        src={acceptedFiles.length > 0 ? URL.createObjectURL(acceptedFiles[0]) : operator.photo}
        sx={{ width: 128, height: 128 }}
      />

      <input {...getInputProps()} />

      <Dropper active={isDragActive || uploading}>
        <Typography color={uploading ? 'gray' : undefined}>
          {
            uploading
              ? <CircularProgress size={20} color="secondary" />
              : (
                acceptedFiles.length > 0
                  ? acceptedFiles[0].name
                  : 'Drop logo here'
              )
          }
        </Typography>

        {uploadPhotoStatus === 'error' && <Typography>There was an error</Typography>}
      </Dropper>
    </div>
  )
}
