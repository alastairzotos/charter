import { ListItemButton, ListItemText } from "@mui/material";
import { BookingDto } from "dtos";
import React from "react";
import { calculateBookingPrice, createPriceString } from "utils";

interface Props {
  selected: boolean;
  booking: BookingDto;
  onClick: () => void;
}

export const BookingAnalyticsListItem: React.FC<Props> = ({
  selected,
  booking,
  onClick,
}) => {
  const bookingPrice = calculateBookingPrice(
    booking.priceDetails,
    booking.service
  );
  const secondaryText =
    bookingPrice >= 0
      ? `${booking.date} - ${createPriceString(bookingPrice)}`
      : booking.date;

  return (
    <ListItemButton selected={selected} onClick={onClick}>
      <ListItemText
        primary={`${booking.service.name} by ${booking.operator.name}`}
        secondary={secondaryText}
      />
    </ListItemButton>
  );
};
