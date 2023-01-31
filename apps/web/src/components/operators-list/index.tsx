import React, { useEffect } from 'react';
import { CircularProgress, Button } from '@mui/material';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { useOperatorsState } from '../../state/operators';
import { OperatorListItem } from '../operator-list-item';
import { urls } from 'urls';
import { Fetchable } from '../fetchable';

export const OperatorsList: React.FC = () => {
  const [loadOperatorsStatus, loadOperators, operators] = useOperatorsState(s => [s.loadOperatorsStatus, s.loadOperators, s.operators]);

  useEffect(() => {
    if (!loadOperatorsStatus) {
      loadOperators();
    }
  }, [loadOperatorsStatus, loadOperators]);

  return (
    <Fetchable
      status={loadOperatorsStatus}
      error={<Typography>There was an error loading the operators</Typography>}
    >
      <List sx={{ width: '100%' }}>
        {
          operators.map(operator => (
            <OperatorListItem key={operator._id} operator={operator} />
          ))
        }
      </List>

      <Button
        variant="contained"
        component={Link}
        href={urls.admin.operatorsCreate()}
        sx={{ mt: 3 }}
      >
        Create
      </Button>
    </Fetchable>
  )
}
