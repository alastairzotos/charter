import { Button, Typography } from '@mui/material';
import { OperatorDto } from 'dtos';
import React from 'react';
import Link from 'next/link';
import { urls } from 'urls';
import { Titled } from '../titled';

interface Props {
  operator: OperatorDto;
}

export const OperatorSummary: React.FC<Props> = ({ operator }) => {
  return (
    <Titled title={operator.name}>
      <Typography variant="subtitle2">{operator.email}</Typography>
      <Typography variant="subtitle2">{operator.address}</Typography>
      <Typography variant="subtitle2">{operator.phoneNumber}</Typography>
      <Button
        href={urls.admin.operatorEdit(operator._id)}
        LinkComponent={Link}
        variant="outlined"
        sx={{ mt: 3 }}
      >
        Edit
      </Button>
    </Titled>
  )
}