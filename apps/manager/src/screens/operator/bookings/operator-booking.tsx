import ArrowBackIcon from "@mui/icons-material/ArrowBackIos";
import { Box, Button } from "@mui/material";
import { BookingDto } from "dtos";
import Link from "next/link";
import React from "react";
import { urls } from "urls";

import { OperatorBookingSummary } from "components/operator/bookings/operator-booking-summary";

interface Props {
  booking: BookingDto;
}

export const OperatorBooking: React.FC<Props> = ({ booking }) => {
  return (
    <>
      <Button component={Link} href={urls.operators.bookings()}>
        <ArrowBackIcon />
        Back to bookings
      </Button>

      <Box sx={{ mt: 2 }}>
        <OperatorBookingSummary booking={booking} />
      </Box>
    </>
  );
};
