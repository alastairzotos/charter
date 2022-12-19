import React, { useEffect } from 'react';
import { Paper, Button, Divider, Typography, CircularProgress } from '@mui/material';
import { useOperatorsState } from '../../state/operators';
import Link from 'next/link';
import { urls } from '../../urls';
import { Fetchable } from '../fetchable';
import { TripList } from '../trip-list';

interface Props {
  id: string;
}

export const OperatorItem: React.FC<Props> = ({ id }) => {
  const [loadOperatorStatus, loadOperator, operator] = useOperatorsState(s => [s.loadOperatorStatus, s.loadOperator, s.operator]);

  useEffect(() => {
    if (id) {
      loadOperator(id);
    }
  }, [id]);

  return (
    <Paper sx={{ p: 3 }}>
      <Fetchable
        status={loadOperatorStatus}
        fetching={<CircularProgress />}
        error={<Typography>There was an error loading the operator</Typography>}
        success={
          <>
            {!!operator && (
              <>
                <Typography variant="h6">{operator.name}</Typography>
                <Typography variant="subtitle2">{operator.email}</Typography>
                <Typography variant="subtitle2">{operator.address}</Typography>
                <Typography variant="subtitle2">{operator.phoneNumber}</Typography>
                <Button href={urls.admin.operatorEdit(id)} variant="outlined" sx={{ mt: 3, mb: 3 }}>
                  Edit
                </Button>
              </>
            )}
          </>
        }
      />
      
      <Divider sx={{ mb: 3 }} />

      <Typography variant="h6">Available trips</Typography>
      <TripList operatorId={id} />
    </Paper>
  )
}
