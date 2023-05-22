import { Alert, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { KeyValues, StatusSwitch } from "ui";
import { getReadableBookingDetails } from "utils";

import { useLoadBooking } from "state/bookings";
import { SETTINGS_WIDTH } from "util/misc";

interface Props {
  bookingId: string;
}

export const BookingAnalyticsBooking: React.FC<Props> = ({ bookingId }) => {
  const { status, request, value: booking } = useLoadBooking();

  useEffect(() => {
    request(bookingId);
  }, [bookingId]);

  return (
    <StatusSwitch
      status={status}
      error={<Typography>There was an error loading the booking</Typography>}
    >
      {booking && (
        <KeyValues
          sx={{ maxWidth: SETTINGS_WIDTH }}
          kv={{
            Service: booking.service.name,
            ...getReadableBookingDetails(booking),
          }}
        />
      )}

      {booking?.status === "pending" && (
        <Alert severity="info">Operator has yet to approve the booking</Alert>
      )}
      {booking?.status === "rejected" && (
        <Alert severity="warning">Operator has rejected the booking</Alert>
      )}
      {booking?.status === "confirmed" && (
        <Alert severity="success">Booking confirmed and paid</Alert>
      )}
    </StatusSwitch>
  );
};
