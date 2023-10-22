import { Alert, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { KeyValues, StatusSwitch } from "ui";
import { getReadableBookingDetails } from "utils";

import { useLoadBooking } from "state/bookings";
import { SETTINGS_WIDTH } from "util/misc";
import { BookingAnalyticsBookingDetails } from "components/admin/bookings/booking-analytics-booking-details";

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
      {booking && <BookingAnalyticsBookingDetails booking={booking} />}
    </StatusSwitch>
  );
};
