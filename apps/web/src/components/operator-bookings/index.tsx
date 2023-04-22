import { Typography } from "@mui/material";
import React, { useEffect } from "react";

import { OperatorBookingList } from "components/operator-booking-list";
import { StatusSwitch } from "components/status-switch";
import { useLoadBookingsForUser } from "state/bookings";

export const OperatorBookings: React.FC = () => {
  const [getBookingsForUserStatus, getBookingsForUser, userBookings] =
    useLoadBookingsForUser((s) => [s.status, s.request, s.value]);

  useEffect(() => {
    if (!userBookings) {
      getBookingsForUser();
    }
  }, [userBookings]);

  const pendingBookings = userBookings
    ? userBookings.filter((booking) => booking.status === "pending")
    : undefined;

  const confirmedBookings = userBookings
    ? userBookings.filter((booking) => booking.status === "confirmed")
    : undefined;

  const rejectedBookings = userBookings
    ? userBookings.filter((booking) => booking.status === "rejected")
    : undefined;

  return (
    <StatusSwitch
      status={getBookingsForUserStatus}
      error={
        <Typography>
          There was an error loading the bookings. Please try again later.
        </Typography>
      }
    >
      <OperatorBookingList
        title="Pending bookings"
        bookings={pendingBookings}
      />

      <OperatorBookingList
        title="Confirmed bookings"
        bookings={confirmedBookings}
      />

      <OperatorBookingList
        title="Rejected bookings"
        bookings={rejectedBookings}
      />
    </StatusSwitch>
  );
};
