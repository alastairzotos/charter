import React, { useEffect } from 'react';
import { Button, CircularProgress, List, Typography } from '@mui/material';
import Link from 'next/link';
import { useTripsState } from '../../state/trips';
import { Fetchable } from '../fetchable';
import { urls } from '../../urls';
import { TripListItem } from '../trip-list-item';

interface Props {
  operatorId: string;
}

export const TripList: React.FC<Props> = ({ operatorId }) => {
  const [loadTripsStatus, loadTripsForOperator, trips] = useTripsState(s => [s.loadTripsStatus, s.loadTripsForOperator, s.trips]);

  useEffect(() => {
    if (operatorId) {
      loadTripsForOperator(operatorId);
    }
  }, [operatorId]);

  return (
    <Fetchable
      status={loadTripsStatus}
      fetching={<CircularProgress />}
      error={<Typography>There was an error loading the operator's trips</Typography>}
      success={
        <>
          <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {
              trips.map(trip => (
                <TripListItem
                  key={trip._id}
                  operatorId={operatorId}
                  trip={trip}
                />
              ))
            }
          </List>

          <Button
            variant="contained"
            component={Link}
            href={urls.admin.tripsCreate(operatorId)}
            sx={{ mt: 3 }}
          >
            Add trip
          </Button>
        </>
      }
    />
  )
}
