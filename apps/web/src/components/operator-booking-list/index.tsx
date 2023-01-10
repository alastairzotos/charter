import React from 'react';
import { Box, List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material';
import { BookingDto } from 'dtos';
import Link from 'next/link';
import { urls } from '../../urls';

interface Props {
  title: string;
  bookings?: BookingDto[];
}

export const OperatorBookingList: React.FC<Props> = ({ title, bookings }) => {
  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h5">{title}</Typography>

      {
        bookings && bookings.length
          ? (
            <List>
              {
                bookings.map(booking => (
                  <ListItem key={booking._id}>
                    <ListItemButton component={Link} href={urls.operators.booking(booking._id)}>
                      <ListItemText
                        primary={booking.trip.name}
                        secondary={`${booking.name} - ${booking.date} - ${booking.guests} guest${booking.guests === 1 ? '' : 's'}`}
                      />
                    </ListItemButton>
                  </ListItem>
                ))
              }
            </List>
          )
          : <Typography color="text.secondary">There are no bookings in this list</Typography>
      }
    </Box>
  )
}