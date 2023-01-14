import { TripDto } from 'dtos';
import React from 'react';
import ListItem from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Link from 'next/link';
import { urls } from '../../urls';

interface Props {
  trip: TripDto;
}

const DESC_LENGTH = 120;

export const UserTripListItem: React.FC<Props> = ({ trip }) => {
  const desc = trip.description.length > DESC_LENGTH ? trip.description.substring(0, DESC_LENGTH - 3) + '...' : trip.description;

  return (
    <ListItem
      alignItems="flex-start"
      component={Link}
      href={urls.user.trip(trip)}
    >
      <ListItemText
        primary={`${trip.name} - From €${trip.adultPrice} per adult`}
        secondary={desc}
      />
    </ListItem>
  )
}
