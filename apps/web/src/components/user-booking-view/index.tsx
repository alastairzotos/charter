import { Box, LinearProgress, Typography } from "@mui/material";
import { BookingDto } from "dtos";
import React, { useEffect, useRef, useState } from "react";
import {
  calculateBookingPrice,
  createPriceString,
  getReadableBookingDetails,
} from "utils";

import { KeyValues } from "src/components/key-values";
import { useGetBookingPaymentStatus } from "src/state/bookings";

interface Props {
  booking: BookingDto;
}

export const UserBookingView: React.FC<Props> = ({ booking }) => {
  const [getPaymentStatus, paymentStatus] = useGetBookingPaymentStatus((s) => [
    s.request,
    s.value,
  ]);

  const interval = useRef<NodeJS.Timer>();

  useEffect(() => {
    interval.current = setInterval(() => getPaymentStatus(booking._id), 2000);

    return () => clearInterval(interval.current);
  }, []);

  useEffect(() => {
    if (paymentStatus && paymentStatus !== "pending") {
      clearInterval(interval.current);
    }
  }, [paymentStatus]);

  const bookingDetails = getReadableBookingDetails(booking);

  return (
    <>
      <Typography variant="h4">
        Your booking with {booking.operator.name}
      </Typography>
      <Box sx={{ p: 2 }}>
        <Box sx={{ mt: 2 }}>
          {paymentStatus === null && (
            <Box sx={{ width: "50%" }}>
              <LinearProgress />
            </Box>
          )}

          {paymentStatus === "pending" && (
            <Box sx={{ width: "50%" }}>
              <LinearProgress />
              <Typography sx={{ mt: 3 }}>Processing payment</Typography>
            </Box>
          )}

          {paymentStatus === "failed" && (
            <Typography>
              Unfortunately your payment failed to go through. Please try again.
            </Typography>
          )}

          {paymentStatus === "cancelled" && (
            <Typography>It looks like you cancelled your payment.</Typography>
          )}

          {paymentStatus === "succeeded" && (
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
