import { ListItemButton, ListItemText } from "@mui/material";
import { BookingDto } from "dtos";
import React from "react";
import { calculateBookingPrice, createPriceString, formatDate } from "utils";

import { IBookingAnalyticsDateType } from "components/admin/bookings/booking-analytics.models";

interface Props {
  selected: boolean;
  booking: BookingDto;
  dateType: IBookingAnalyticsDateType;
  onClick: () => void;
}

export const BookingAnalyticsListItem: React.FC<Props> = ({
  selected,
  booking,
  dateType,
  onClick,
}) => {
  const bookingPrice = calculateBookingPrice(
    booking.priceDetails,
    booking.service
  );

  const showDate =
    dateType === "booked-for"
      ? `Booked for ${booking.date}`
      : `Booked on ${formatDate(booking.bookingDate)}`;

  const secondaryText =
    bookingPrice >= 0
      ? `${showDate} - ${createPriceString(bookingPrice)}`
      : showDate;

  return (
    <ListItemButton selected={selected} onClick={onClick}>
      <ListItemText
        primary={`${booking.service.name} by ${booking.operator.name}`}
        secondary={secondaryText}
      />
    </ListItemButton>
  );
};
