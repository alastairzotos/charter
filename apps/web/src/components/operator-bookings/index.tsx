import { CircularProgress, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useBookingsState } from '../../state/bookings';
import { Fetchable } from '../fetchable';
import { OperatorBookingList } from '../operator-booking-list';

export const OperatorBookings: React.FC = () => {
  const [getBookingsForUserStatus, getBookingsForUser, userBookings] = useBookingsState(s => [s.getBookingsForUserStatus, s.getBookingsForUser, s.userBookings]);

  useEffect(() => {
    if (!userBookings) {
      getBookingsForUser();
    }
  }, [userBookings]);

  const pendingBookings = userBookings ? userBookings.filter(booking => booking.status === 'pending') : undefined;
  const confirmedBookings = userBookings ? userBookings.filter(booking => booking.status === 'confirmed') : undefined;
  const rejectedBookings = userBookings ? userBookings.filter(booking => booking.status === 'rejected') : undefined;

  return (
    <Fetchable
      status={getBookingsForUserStatus}
      error={<Typography>There was an error loading the bookings. Please try again later.</Typography>}
    >
      {/* <OperatorBookingList title="Pending bookings" bookings={pendingBookings} /> */}
      <OperatorBookingList title="Confirmed bookings" bookings={confirmedBookings} />
      {/* <OperatorBookingList title="Rejected bookings" bookings={rejectedBookings} /> */}
    </Fetchable>
  )
}
