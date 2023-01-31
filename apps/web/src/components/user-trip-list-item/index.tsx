import { TripDto } from 'dtos';
import React from 'react';
import ListItem from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Link from 'next/link';
import { urls } from 'urls';
import { Avatar, ListItemAvatar } from '@mui/material';

interface Props {
  trip: TripDto;
}

const DESC_LENGTH = 250;

export const UserTripListItem: React.FC<Props> = ({ trip }) => {
  const desc = trip.description.length > DESC_LENGTH ? trip.description.substring(0, DESC_LENGTH - 3) + '...' : trip.description;

  return (
    <ListItem
      alignItems="flex-start"
      component={Link}
      href={urls.user.trip(trip)}
    >
      <ListItemAvatar>
        <Avatar alt={trip.name} src={trip.photos[0]} />
      </ListItemAvatar>

      <ListItemText
        primary={`${trip.name} - From €${trip.adultPrice.toFixed(2)} per adult`}
        secondary={desc}
      />
    </ListItem>
  )
}
