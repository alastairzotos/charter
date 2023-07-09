import { Typography } from "@mui/material";
import { OperatorDto } from "dtos";
import React, { useState } from "react";
import { OperatorSearch, StatusSwitch } from "ui";

import { BookingAnalytics } from "components/admin/bookings/booking-analytics";
import { useLoadBookingsByOperatorId } from "state/bookings";
import { useLoadOperator, useLoadOperators } from "state/operators";

export const BookingAnalyticsOperator: React.FC = () => {
  const [selectedOperatorId, setSelectedOperatorId] = useState<string | null>(
    null
  );

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
      setSelectedOperatorId(operator._id);
      loadOperator(operator._id);
      loadBookings(operator._id);
    }
  };

  const handleRefresh = () => {
    if (!!selectedOperatorId) {
      loadBookings(selectedOperatorId);
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
              <BookingAnalytics bookings={bookings} onRefresh={handleRefresh} />
            </StatusSwitch>
          </>
        )}
      </StatusSwitch>
    </>
  );
};
