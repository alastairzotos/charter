import React, { useEffect } from 'react';
import { CircularProgress, Typography, Paper } from '@mui/material';
import { Fetchable } from '../fetchable';
import { useTripsState } from '../../state/trips';
import { ManageTripForm } from '../trip-manage';

interface Props {
  id: string;
  operatorId: string;
}

export const TripEdit: React.FC<Props> = ({ id, operatorId }) => {
  const [loadTripStatus, loadTrip, trip] = useTripsState(s => [s.loadTripStatus, s.loadTrip, s.trip]);
  const [updateTripStatus, updateTrip] = useTripsState(s => [s.updateTripStatus, s.updateTrip]);
  const [deleteTripStatus, deleteTrip] = useTripsState(s => [s.deleteTripStatus, s.deleteTrip]);

  useEffect(() => {
    if (id) {
      loadTrip(id);
    }
  }, [id]);

  return (
    <Fetchable
      status={loadTripStatus}
      fetching={<CircularProgress />}
      error={<Typography>There was an error loading the trip</Typography>}
      success={(
        <>
          {!!trip && (
            <ManageTripForm
              title="Edit trip"
              operatorId={operatorId}
              id={id}
              trip={trip}
              onSave={newTrip => updateTrip(id, newTrip)}
              saveStatus={updateTripStatus}

              onDelete={() => deleteTrip(id)}
              deleteStatus={deleteTripStatus}
            />
          )}
        </>
      )}
    />
  )
}
