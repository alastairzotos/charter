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
        <Box sx={{ mt: 2 }}>
          {booking.paymentStatus === "pending" && (
            <Typography>
              We&apos;re waiting for your payment to go through. Refresh this
              page to check updates.
            </Typography>
          )}

          {booking.paymentStatus === "failed" && (
            <Typography>
              Unfortunately your payment failed to go through. Please try again.
            </Typography>
          )}

          {booking.paymentStatus === "cancelled" && (
            <Typography>It looks like you cancelled your payment.</Typography>
          )}

          {booking.paymentStatus === "succeeded" && (
            <Typography>
              Your payment has succeeded! Get ready to enjoy{" "}
              <strong>{booking.service.name}!</strong>
            </Typography>
          )}
        </Box>

        {booking.paymentStatus === "succeeded" && (
          <KeyValues
            sx={{ maxWidth: 600, mt: 3 }}
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
        )}
      </Box>
    </>
  );
};
