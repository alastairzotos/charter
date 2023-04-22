import { Typography } from "@mui/material";
import React, { useEffect } from "react";

import { BookingAnalyticsList } from "components/booking-analytics/list";
import { StatusSwitch } from "components/status-switch";
import { useLoadBookingsByOperatorId } from "state/bookings";
import { useLoadOperator } from "state/operators";

interface Props {
  operatorId: string;
}

export const BookingAnalytics: React.FC<Props> = ({ operatorId }) => {
  const {
    status: operatorStatus,
    request: loadOperator,
    value: operator,
  } = useLoadOperator();
  const {
    status: bookingsStatus,
    request: loadBookings,
    value: bookings,
  } = useLoadBookingsByOperatorId();

  useEffect(() => {
    loadOperator(operatorId);
    loadBookings(operatorId);
  }, [operatorId]);

  return (
    <StatusSwitch
      status={operatorStatus}
      error={<Typography>There was an error loading the operator</Typography>}
    >
      <Typography variant="h5" sx={{ mb: 3 }}>
        Bookings for {operator?.name}
      </Typography>

      <StatusSwitch
        status={bookingsStatus}
        error={<Typography>There was an error loading the bookings</Typography>}
      >
        <BookingAnalyticsList
          operatorId={operatorId}
          bookings={bookings || []}
        />
      </StatusSwitch>
    </StatusSwitch>
  );
};
