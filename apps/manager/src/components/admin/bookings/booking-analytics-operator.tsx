import { Typography } from "@mui/material";
import { OperatorDto } from "dtos";
import React from "react";
import { OperatorSearch, StatusSwitch } from "ui";

import { BookingAnalytics } from "components/admin/bookings/booking-analytics";
import { useLoadBookingsByOperatorId } from "state/bookings";
import { useLoadOperator, useLoadOperators } from "state/operators";

export const BookingAnalyticsOperator: React.FC = () => {
  const loadOperatorsState = useLoadOperators();

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

  const handleSelectOperator = (operator: OperatorDto) => {
    if (operator) {
      loadOperator(operator._id);
      loadBookings(operator._id);
    }
  };

  return (
    <>
      <OperatorSearch
        state={loadOperatorsState}
        onSelectOperator={handleSelectOperator}
      />

      <StatusSwitch
        status={operatorStatus}
        error={<Typography>There was an error loading the operator</Typography>}
      >
        {operator && (
          <>
            <Typography variant="h5" sx={{ mb: 3 }}>
              Bookings for {operator?.name}
            </Typography>

            <StatusSwitch
              status={bookingsStatus}
              error={
                <Typography>There was an error loading the bookings</Typography>
              }
            >
              <BookingAnalytics bookings={bookings} />
            </StatusSwitch>
          </>
        )}
      </StatusSwitch>
    </>
  );
};
