import React, { useEffect, useState } from 'react';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBackIos';
import { useBookingsState } from '../../state/bookings';
import { Fetchable } from '../fetchable';
import Link from 'next/link';
import { urls } from '../../urls';
import { DeleteConfirmModal } from '../modals/delete-confirm';
import { useRouter } from 'next/router';

interface Props {
  id: string;
}

export const OperatorBooking: React.FC<Props> = ({ id }) => {
  const router = useRouter();

  const [getBookingStatus, getBooking, booking] = useBookingsState(s => [s.getBookingStatus, s.getBooking, s.booking]);
  const [setBookingStatusStatus, setBookingStatus] = useBookingsState(s => [s.setBookingStatusStatus, s.setBookingStatus]);

  const [rejectModalOpen, setRejectModalOpen] = useState(false);

  useEffect(() => {
    if (!!id) {
      getBooking(id);
    }
  }, [id]);

  const rejectBooking = async () => {
    await setBookingStatus(id, 'rejected');
    router.push(urls.operators.home());
  }

  const confirmBooking = async () => {
    await setBookingStatus(id, 'confirmed');
    router.push(urls.operators.home());
  }

  return (
    <>
      <Button
        component={Link}
        href={urls.operators.home()}
      >
        <ArrowBackIcon />
        Back to bookings
      </Button>

      <Box sx={{ mt: 2 }}>
        <Fetchable
          status={getBookingStatus}
          fetching={<CircularProgress />}
          error={<Typography>There was an error getting the booking. Please try again later.</Typography>}
          success={
            booking && (
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
        />
      </Box>
    </>
  )
}
