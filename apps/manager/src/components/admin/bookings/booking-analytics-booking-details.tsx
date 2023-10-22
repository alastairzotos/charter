import { Alert } from "@mui/material";
import React from "react";
import { KeyValues } from "ui";
import { getReadableBookingDetails } from "utils";

import { SETTINGS_WIDTH } from "util/misc";
import { BookingDto } from "dtos";

interface Props {
  booking: BookingDto;
}

export const BookingAnalyticsBookingDetails: React.FC<Props> = ({
  booking,
}) => {
  return (
    <>
      <KeyValues
        sx={{ maxWidth: SETTINGS_WIDTH }}
        kv={{
          Service: booking.service.name,
          ...getReadableBookingDetails(booking),
        }}
      />

      {booking?.status === "pending" && (
        <Alert severity="info">Operator has yet to approve the booking</Alert>
      )}
      {booking?.status === "rejected" && (
        <Alert severity="warning">Operator has rejected the booking</Alert>
      )}
      {booking?.status === "confirmed" && (
        <Alert severity="success">Booking confirmed and paid</Alert>
      )}
    </>
  );
};
