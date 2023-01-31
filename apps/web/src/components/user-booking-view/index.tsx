import { Box, Typography } from '@mui/material';
import { BookingDto } from 'dtos';
import React from 'react';
import { createPriceString } from 'utils';
import { KeyValue } from '../key-value';

interface Props {
  booking: BookingDto;
}

export const UserBookingView: React.FC<Props> = ({ booking }) => {
  return (
    <>
      <Typography variant="h4">Your booking with {booking.operator.name}</Typography>
      <Box sx={{ p: 2 }}>
        <KeyValue label="Name" value={booking.name} />
        <KeyValue label="Email" value={booking.email} />
        <KeyValue label="Date" value={booking.date} />
        <KeyValue label="Adults" value={booking.adultGuests} />
        <KeyValue label="Children" value={booking.childGuests} />
        <KeyValue label="Price" value={createPriceString(booking, booking.trip)} />

        <Box sx={{ mt: 2 }}>
          {booking.status === 'pending' && <Typography>Your booking is pending. Check back here for status updates. We will also email you when the status changes.</Typography>}
          {booking.status === 'rejected' && <Typography>Unfortunately the tour operator has decided to reject your booking</Typography>}
          {booking.status === 'confirmed' && <Typography>Your booking has been confirmed. Get ready to enjoy <strong>{booking.trip.name}</strong>!</Typography>}
        </Box>
      </Box>
    </>
  )
}
