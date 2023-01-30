import { Typography } from '@mui/material';
import { blueGrey } from '@mui/material/colors';
import { Box } from '@mui/system';
import Image from 'next/image';
import React from 'react';
import { APP_NAME } from '../../util/misc';

export const Footer: React.FC = () => {
  return (
    <Box sx={{ bgcolor: blueGrey[100], p: 10, mt: 6 }}>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Image src="/logo.png" alt={`${APP_NAME} logo`} width={64} height={64} />
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Typography variant="subtitle2" color="GrayText">&copy; {APP_NAME} {(new Date()).getFullYear()}</Typography>
      </Box>
    </Box>
  )
};
