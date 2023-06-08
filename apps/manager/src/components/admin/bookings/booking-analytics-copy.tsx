import { Button } from "@mui/material";
import { BookingDto } from "dtos";
import React, { useState } from "react";

import {
  BookingFilterType,
  getBookingSummary,
} from "components/admin/bookings/booking-analytics.models";

interface Props {
  title: string;
  bookings: BookingDto[];
  filterType: BookingFilterType;
  totalPrice: string;
}

const defaultCopyText = "Copy to clipboard (without fees)";

export const BookingAnalyticsCopy: React.FC<Props> = ({
  title,
  bookings,
  filterType,
  totalPrice,
}) => {
  const [copyText, setCopyText] = useState(defaultCopyText);

  const updateCopyText = (text: string) => {
    setCopyText(text);
    setTimeout(() => setCopyText(defaultCopyText), 1500);
  };

  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(
        [
          title,
          "\n",
          `Total price: ${totalPrice}`,
          "\n\n",
          ...bookings.map(
            (booking) =>
              `${booking.service.name} by ${
                booking.operator.name
              }\n${getBookingSummary(booking, filterType, false)}\n\n`
          ),
        ].join("")
      );

      updateCopyText("Copied!");
    } catch {
      updateCopyText("There was an error");
    }
  };

  return (
    <Button variant="outlined" size="small" onClick={handleCopyClick}>
      {copyText}
    </Button>
  );
};
