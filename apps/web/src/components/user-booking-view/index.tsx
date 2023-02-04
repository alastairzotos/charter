import { Box, Typography } from "@mui/material";
import { BookingDto } from "dtos";
import React from "react";
import {
  calculateBookingPrice,
  createPriceString,
  getReadableBookingDetails,
} from "utils";

import { KeyValues } from "src/components/key-values";

interface Props {
  booking: BookingDto;
}

export const UserBookingView: React.FC<Props> = ({ booking }) => {
  const bookingDetails = getReadableBookingDetails(booking);

  return (
    <>
      <Typography variant="h4">
        Your booking with {booking.operator.name}
      </Typography>
      <Box sx={{ p: 2 }}>
        <KeyValues
          sx={{ maxWidth: 600 }}
          kv={{
            Name: booking.name,
            Email: booking.email,
            Date: booking.date,
            ...bookingDetails,
            Price: createPriceString(
              calculateBookingPrice(booking.priceDetails, booking.service)
            ),
          }}
        />

        <Box sx={{ mt: 2 }}>
          {booking.status === "pending" && (
            <Typography>
              Your booking is pending. Check back here for status updates. We
              will also email you when the status changes.
            </Typography>
          )}
          {booking.status === "rejected" && (
            <Typography>
              Unfortunately the tour operator has decided to reject your booking
            </Typography>
          )}
          {booking.status === "confirmed" && (
            <Typography>
              Your booking has been confirmed. Get ready to enjoy{" "}
              <strong>{booking.service.name}</strong>!
            </Typography>
          )}
        </Box>
      </Box>
    </>
  );
};
