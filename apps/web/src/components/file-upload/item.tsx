import { IconButton, ImageListItem } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/system';
import React, { useState } from 'react';

interface Props {
  onDelete?: () => void;
}

const Overlay = styled('div')(() => ({
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
}))

export const FileUploadItem: React.FC<React.PropsWithChildren<Props>> = ({
  onDelete,
  children
}) => {
  const [hover, setHover] = useState(false);

  return (
    <ImageListItem
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {children}
      {!!onDelete && hover && (
        <Overlay>
          <IconButton onClick={onDelete}>
            <CloseIcon />
          </IconButton>
        </Overlay>
      )}
    </ImageListItem>
  )
}
