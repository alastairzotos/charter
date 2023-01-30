import React, { useEffect, useState } from 'react';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBackIos';
import { useBookingsState } from '../../state/bookings';
import { Fetchable } from '../fetchable';
import Link from 'next/link';
import { urls } from '../../urls';
import { DeleteConfirmModal } from '../modals/delete-confirm';
import { useRouter } from 'next/router';
import { OperatorBookingSummary } from '../operator-booking-summary';

interface Props {
  id: string;
}

export const OperatorBooking: React.FC<Props> = ({ id }) => {
  const [getBookingStatus, getBooking, booking] = useBookingsState(s => [s.getBookingStatus, s.getBooking, s.booking]);

  useEffect(() => {
    if (!!id) {
      getBooking(id);
    }
  }, [id]);

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
          error={<Typography>There was an error getting the booking. Please try again later.</Typography>}
        >
          <OperatorBookingSummary booking={booking!} />
        </Fetchable>
      </Box>
    </>
  )
}
