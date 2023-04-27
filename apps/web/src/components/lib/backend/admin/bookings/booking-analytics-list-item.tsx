import { ListItem, ListItemText } from "@mui/material";
import { BookingDto } from "dtos";
import Link from "next/link";
import React from "react";
import { urls } from "urls";
import { calculateBookingPrice, createPriceString } from "utils";

interface Props {
  operatorId: string;
  booking: BookingDto;
}

export const BookingAnalyticsListItem: React.FC<Props> = ({
  operatorId,
  booking,
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
    <ListItem
      component={Link}
      href={urls.admin.operatorBooking(operatorId, booking._id)}
    >
      <ListItemText primary={booking.service.name} secondary={secondaryText} />
    </ListItem>
  );
};
