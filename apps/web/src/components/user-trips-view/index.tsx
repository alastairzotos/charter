import { List, Typography } from '@mui/material';
import { TripDto } from 'dtos';
import React from 'react';
import { UserTripListItem } from '../user-trip-list-item';

interface Props {
  trips: TripDto[];
}

export const UserTripsView: React.FC<Props> = ({ trips }) => {
  return (
    <>
      <Typography variant="h6">Trips</Typography>
      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {
          trips.map(trip => (
            <UserTripListItem key={trip._id} trip={trip} />
          ))
        }
      </List>
    </>
  )
}
