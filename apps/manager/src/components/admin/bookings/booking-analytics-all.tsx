import { Typography } from "@mui/material";
import React, { useEffect } from "react";
import { StatusSwitch } from "ui";

import { BookingAnalytics } from "components/admin/bookings/booking-analytics";
import { useLoadAllBookings } from "state/bookings";

export const BookingAnalyticsAll: React.FC = () => {
  const [loadBookingsStatus, loadBookings, bookings] = useLoadAllBookings(
    (s) => [s.status, s.request, s.value]
  );

  useEffect(() => {
    loadBookings();
  }, []);

  return (
    <StatusSwitch
      status={loadBookingsStatus}
      error={<Typography>There was an error loading the bookings</Typography>}
    >
      <BookingAnalytics bookings={bookings} />
    </StatusSwitch>
  );
};
