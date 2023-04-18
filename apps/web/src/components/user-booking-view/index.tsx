import { Box, Button, LinearProgress, Paper, Typography } from "@mui/material";
import { BookingDto } from "dtos";
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import { urls } from "urls";
import { getQrCodeFilePathForBooking, getReadableBookingDetails } from "utils";

import { KeyValues } from "src/components/key-values";
import { useGetBookingPaymentStatus } from "src/state/bookings";
import { getEnv } from "src/util/env";
import { SETTINGS_WIDTH } from "src/util/misc";

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

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h4">
        Your booking with {booking.operator.name}
      </Typography>
      <Box sx={{ p: 2 }}>
        <Box sx={{ mt: 2 }}>
          {!paymentStatus ||
            (paymentStatus === "pending" && (
              <Box sx={{ width: "50%" }}>
                <LinearProgress sx={{ mb: 3 }} />

                {!booking.service.approveBookingBeforePayment && (
                  <Typography>Processing payment</Typography>
                )}

                {booking.service.approveBookingBeforePayment && (
                  <Typography>
                    Waiting for operator to approve your booking. You will
                    receive an email when they confirm or reject.
                  </Typography>
                )}
                <Typography sx={{ mt: 3 }}>
                  It is safe to close this page
                </Typography>
              </Box>
            ))}

          {paymentStatus === "failed" && (
            <Typography>
              Unfortunately your payment failed to go through. Please try again.
            </Typography>
          )}

          {paymentStatus === "cancelled" &&
            (booking.service.approveBookingBeforePayment ? (
              <>
                <Typography>
                  Unforunately the operator has rejected your booking. This is
                  likely due to being overbooked.
                </Typography>
                <Typography>
                  Don't worry, you won't be charged for this booking.
                </Typography>
                <Typography>
                  In the meantime, why not have a look at what other services we
                  offer!
                </Typography>
                <Button
                  sx={{ mt: 2 }}
                  variant="contained"
                  component={Link}
                  href={urls.user.services()}
                >
                  View services
                </Button>
              </>
            ) : (
              <Typography>It looks like you cancelled your payment.</Typography>
            ))}

          {paymentStatus === "succeeded" && (
            <>
              <Typography>
                Your booking is a success! Get ready to enjoy{" "}
                <a href={urls.user.service(booking.service)} target="_blank">
                  {booking.service.name}!
                </a>
              </Typography>

              <Typography sx={{ mt: 2 }}>
                Verify your booking with the operator by showing them the QR
                code below.
              </Typography>
              <Typography>
                You will also receive this in a confirmation email.
              </Typography>
              <img
                src={`${
                  getEnv().awsCloudfrontDomain
                }${getQrCodeFilePathForBooking(booking)}`}
                width="250"
                height="250"
              />
            </>
          )}
        </Box>

        {paymentStatus === "succeeded" && (
          <KeyValues
            sx={{ maxWidth: SETTINGS_WIDTH, mt: 3 }}
            kv={getReadableBookingDetails(booking)}
          />
        )}
      </Box>
    </Paper>
  );
};
