import { TripDto } from 'dtos';
import React from 'react';
import ListItem from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Link from 'next/link';
import { urls } from '../../urls';

interface Props {
  operatorId: string;
  trip: TripDto;
}

export const TripListItem: React.FC<Props> = ({ operatorId, trip }) => {
  return (
    <ListItem
      alignItems="flex-start"
      component={Link}
      href={urls.admin.trip(operatorId, trip._id)}
    >
      <ListItemText
        primary={trip.name}
        secondary={
          <>
            {trip.startLocation} - {trip.startTime}
          </>
        }
      />
    </ListItem>
  )
}
