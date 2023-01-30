import React, { useEffect } from 'react';
import { Button, Divider, Typography, CircularProgress } from '@mui/material';
import { useOperatorsState } from '../../state/operators';
import Link from 'next/link';
import { urls } from '../../urls';
import { Fetchable } from '../fetchable';
import { TripList } from '../trip-list';
import { Titled } from '../titled';

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
    <>
      <Fetchable
        status={loadOperatorStatus}
        fetching={<CircularProgress />}
        error={<Typography>There was an error loading the operator</Typography>}
        success={
          <>
            {!!operator && (
              <Titled title={operator.name}>
                <Typography variant="subtitle2">{operator.email}</Typography>
                <Typography variant="subtitle2">{operator.address}</Typography>
                <Typography variant="subtitle2">{operator.phoneNumber}</Typography>
                <Button
                  href={urls.admin.operatorEdit(id)}
                  LinkComponent={Link}
                  variant="outlined"
                  sx={{ mt: 3, mb: 3 }}
                >
                  Edit
                </Button>
              </Titled>
            )}
          </>
        }
      />
      
      <Divider sx={{ mb: 3, mt: 3 }} />

      <Titled title="Trips">
        <TripList operatorId={id} />
      </Titled>
    </>
  )
}
