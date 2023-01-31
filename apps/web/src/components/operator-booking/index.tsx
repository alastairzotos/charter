import ArrowBackIcon from "@mui/icons-material/ArrowBackIos";
import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";
import React, { useEffect } from "react";
import { urls } from "urls";

import { Fetchable } from "src/components/fetchable";
import { OperatorBookingSummary } from "src/components/operator-booking-summary";
import { useBookingsState } from "src/state/bookings";

interface Props {
  id: string;
}

export const OperatorBooking: React.FC<Props> = ({ id }) => {
  const [getBookingStatus, getBooking, booking] = useBookingsState((s) => [
    s.getBookingStatus,
    s.getBooking,
    s.booking,
  ]);

  useEffect(() => {
    if (!!id) {
      getBooking(id);
    }
  }, [id]);

  return (
    <>
      <Button component={Link} href={urls.operators.home()}>
        <ArrowBackIcon />
        Back to bookings
      </Button>

      <Box sx={{ mt: 2 }}>
        <Fetchable
          status={getBookingStatus}
          error={
            <Typography>
              There was an error getting the booking. Please try again later.
            </Typography>
          }
        >
          <OperatorBookingSummary booking={booking!} />
        </Fetchable>
      </Box>
    </>
  );
};
