import { Box } from '@mui/system';
import { Form } from 'formik';
import React from 'react';
import { Titled } from '../titled';

interface Props {
  title: string;
}

export const FormBox: React.FC<React.PropsWithChildren<Props>> = ({ title, children }) => (
  <Titled title={title}>
    <Form>
      <Box
        sx={{
          pt: 3,
          pb: 3,
          display: 'flex',
          flexDirection: 'column',
          gap: 2
        }}
      >
        {children}
      </Box>
    </Form>
  </Titled>
)
