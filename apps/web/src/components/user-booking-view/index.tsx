import { Box, Typography } from '@mui/material';
import { BookingDto } from 'dtos';
import React from 'react';

interface Props {
  booking: BookingDto;
}

export const UserBookingView: React.FC<Props> = ({ booking }) => {
  return (
    <>
      <Typography variant="h4">Your booking with {booking.operator.name}</Typography>
      <Box sx={{ p: 2 }}>
        <Typography color="text.secondary"><strong>Name</strong>: {booking.name}</Typography>
        <Typography color="text.secondary"><strong>Email</strong>: {booking.email}</Typography>
        <Typography color="text.secondary"><strong>Date</strong>: {booking.date}</Typography>
        <Typography color="text.secondary"><strong>Adults</strong>: {booking.adultGuests}</Typography>
        <Typography color="text.secondary"><strong>Children</strong>: {booking.childGuests}</Typography>
        <Typography color="text.secondary">
          <strong>Price</strong>
          : €
          {(booking.adultGuests * booking.trip.adultPrice + booking.childGuests * booking.trip.childPrice).toFixed(2)}
        </Typography>

        <Box sx={{ mt: 2 }}>
          {booking.status === 'pending' && <Typography>Your booking is pending. Check back here for status updates. We will also email you when the status changes.</Typography>}
          {booking.status === 'rejected' && <Typography>Unfortunately the tour operator has decided to reject your booking</Typography>}
          {booking.status === 'confirmed' && <Typography>Your booking has been confirmed. Get ready to enjoy <strong>{booking.trip.name}</strong>!</Typography>}
        </Box>
      </Box>
    </>
  )
}
