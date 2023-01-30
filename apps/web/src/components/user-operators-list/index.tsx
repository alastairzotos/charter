import { List } from '@mui/material';
import { OperatorDto } from 'dtos';
import React from 'react';
import { UserOperatorListItem } from '../user-operator-list-item';

interface Props {
  operators: OperatorDto[];
}

export const UserOperatorsList: React.FC<Props> = ({ operators }) => {
  return (
    <List sx={{ width: '100%' }}>
      {
        operators.map(operator => (
          <UserOperatorListItem key={operator._id} operator={operator} />
        ))
      }
    </List>
  )
}
