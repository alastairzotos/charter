import ArrowBackIcon from "@mui/icons-material/ArrowBackIos";
import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";
import React, { useEffect } from "react";
import { urls } from "urls";

import { OperatorBookingSummary } from "src/components/operator-booking-summary";
import { StatusSwitch } from "src/components/status-switch";
import { useLoadBooking } from "src/state/bookings";

interface Props {
  id: string;
}

export const OperatorBooking: React.FC<Props> = ({ id }) => {
  const [getBookingStatus, getBooking, booking] = useLoadBooking((s) => [
    s.status,
    s.request,
    s.value,
  ]);

  useEffect(() => {
    if (!!id) {
      getBooking(id);
    }
  }, [id]);

  return (
    <>
      <Button component={Link} href={urls.operators.bookings()}>
        <ArrowBackIcon />
        Back to bookings
      </Button>

      <Box sx={{ mt: 2 }}>
        <StatusSwitch
          status={getBookingStatus}
          error={
            <Typography>
              There was an error getting the booking. Please try again later.
            </Typography>
          }
        >
          <OperatorBookingSummary booking={booking!} />
        </StatusSwitch>
      </Box>
    </>
  );
};
