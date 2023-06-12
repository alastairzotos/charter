import { ListItemButton, ListItemText } from "@mui/material";
import { BookingDto } from "dtos";
import React from "react";

import { getBookingSummary } from "components/admin/bookings/booking-analytics.utils";
import { AnalyticsFilterType } from "state/analytics";

interface Props {
  selected: boolean;
  booking: BookingDto;
  filterType: AnalyticsFilterType;
  onClick: () => void;
}

export const BookingAnalyticsListItem: React.FC<Props> = ({
  selected,
  booking,
  filterType,
  onClick,
}) => {
  return (
    <ListItemButton selected={selected} onClick={onClick}>
      <ListItemText
        primary={`${booking.service.name} by ${booking.operator.name}`}
        secondary={getBookingSummary(booking, filterType, true)}
      />
    </ListItemButton>
  );
};
