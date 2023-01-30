import { Button, CircularProgress, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { BookingDto } from 'dtos';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useBookingsState } from '../../state/bookings';
import { urls } from '../../urls';
import { DeleteConfirmModal } from '../modals/delete-confirm';

interface Props {
  booking: BookingDto;
}

export const OperatorBookingSummary: React.FC<Props> = ({ booking }) => {
  const router = useRouter();

  const [rejectModalOpen, setRejectModalOpen] = useState(false);

  const [setBookingStatusStatus, setBookingStatus] = useBookingsState(s => [s.setBookingStatusStatus, s.setBookingStatus]);

  const rejectBooking = async () => {
    await setBookingStatus(booking._id, 'rejected');
    router.push(urls.operators.home());
  }

  const confirmBooking = async () => {
    await setBookingStatus(booking._id, 'confirmed');
    router.push(urls.operators.home());
  }

  return (
    <>
      <Typography><strong>Trip</strong>: {booking.trip.name}</Typography>
      <Typography color="text.secondary"><strong>Name</strong>: {booking.name}</Typography>
      <Typography color="text.secondary"><strong>Email</strong>: {booking.email}</Typography>
      <Typography color="text.secondary"><strong>Date</strong>: {booking.date}</Typography>
      <Typography color="text.secondary"><strong>Adults</strong>: {booking.adultGuests}</Typography>
      <Typography color="text.secondary"><strong>Children</strong>: {booking.childGuests}</Typography>
      <Typography color="text.secondary">
        <strong>Price</strong>: €
        {(booking.adultGuests * booking.trip.adultPrice + booking.childGuests * booking.trip.childPrice).toFixed(2)}
      </Typography>
      
      <Box sx={{ mt: 3 }}>
        {booking.status === 'confirmed' && <Typography>This booking has been confirmed</Typography>}
        {booking.status === 'rejected' && <Typography>You have rejected this booking</Typography>}
        {booking.status === 'pending' && (
          <>
            <Box
              sx={{ display: 'flex', justifyContent: 'space-between' }}
            >
              <Button
                color="success"
                variant="contained"
                onClick={confirmBooking}
              >
                {setBookingStatusStatus === 'fetching' ? <CircularProgress size={20} /> : 'Confirm'}
              </Button>

              <Button
                color="warning"
                onClick={() => setRejectModalOpen(true)}
              >
                Reject
              </Button>
            </Box>

            {setBookingStatusStatus === 'error' && <Typography>There was an error. Please try again later.</Typography>}
          </>
        )}
      </Box>

      <DeleteConfirmModal
        title="Reject booking?"
        content="Are you sure you want to reject this booking? This can't be undone"
        open={rejectModalOpen}
        onClose={() => setRejectModalOpen(false)}
        deleteStatus={setBookingStatusStatus}
        onDelete={rejectBooking}
      />
    </>
  )
}
