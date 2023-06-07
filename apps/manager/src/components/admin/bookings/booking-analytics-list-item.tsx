import { ListItemButton, ListItemText } from "@mui/material";
import { BookingDto } from "dtos";
import React from "react";

import {
  BookingFilterType,
  getBookingSummary,
} from "components/admin/bookings/booking-analytics.models";

interface Props {
  selected: boolean;
  booking: BookingDto;
  filterType: BookingFilterType;
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
        secondary={getBookingSummary(booking, filterType)}
      />
    </ListItemButton>
  );
};
