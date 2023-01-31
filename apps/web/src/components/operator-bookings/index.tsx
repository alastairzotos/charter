import { Typography } from "@mui/material";
import React, { useEffect } from "react";

import { Fetchable } from "src/components/fetchable";
import { OperatorBookingList } from "src/components/operator-booking-list";
import { useBookingsState } from "src/state/bookings";

export const OperatorBookings: React.FC = () => {
  const [getBookingsForUserStatus, getBookingsForUser, userBookings] =
    useBookingsState((s) => [
      s.getBookingsForUserStatus,
      s.getBookingsForUser,
      s.userBookings,
    ]);

  useEffect(() => {
    if (!userBookings) {
      getBookingsForUser();
    }
  }, [userBookings]);

  const confirmedBookings = userBookings
    ? userBookings.filter((booking) => booking.status === "confirmed")
    : undefined;

  return (
    <Fetchable
      status={getBookingsForUserStatus}
      error={
        <Typography>
          There was an error loading the bookings. Please try again later.
        </Typography>
      }
    >
      <OperatorBookingList
        title="Confirmed bookings"
        bookings={confirmedBookings}
      />
    </Fetchable>
  );
};
