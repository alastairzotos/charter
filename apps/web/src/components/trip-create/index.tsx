import React, { useEffect } from 'react';
import { CircularProgress, Typography, Paper } from '@mui/material';
import { Fetchable } from '../fetchable';
import { useTripsState } from '../../state/trips';
import { ManageTripForm } from '../trip-manage';
import { useRouter } from 'next/router';
import { TripNoId } from 'dtos';
import { urls } from '../../urls';

interface Props {
  operatorId: string;
}

export const TripCreate: React.FC<Props> = ({ operatorId }) => {
  const router = useRouter();
  const [createTripStatus, createTrip] = useTripsState(s => [s.createTripStatus, s.createTrip]);

  const handleCreateTrip = async (trip: TripNoId) => {
    await createTrip(trip);
    router.push(urls.admin.operator(operatorId));
  }
  
  return (
    <ManageTripForm
      title="Create trip"
      operatorId={operatorId}
      trip={{
        name: '',
        duration: '',
        startLocation: '',
        startTime: '',
        description: '',
        operator: operatorId as any // This will be cast as an ObjectId in the backend
      }}

      onSave={handleCreateTrip}
      saveStatus={createTripStatus}
    />
  )
}