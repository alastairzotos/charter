import { Typography } from "@mui/material";
import Link from "next/link";
import React, { useEffect } from "react";
import { urls } from "urls";
import { getReadableBookingDetails } from "utils";

import { KeyValues } from "src/components/key-values";
import { StatusSwitch } from "src/components/status-switch";
import { useLoadBooking } from "src/state/bookings";

interface Props {
  bookingId: string;
}

export const BookingAnalyticsBooking: React.FC<Props> = ({ bookingId }) => {
  const { status, request, value: booking } = useLoadBooking();

  useEffect(() => {
    request(bookingId);
  }, [bookingId]);

  return (
    <StatusSwitch
      status={status}
      error={<Typography>There was an error loading the booking</Typography>}
    >
      {booking && (
        <KeyValues
          sx={{ maxWidth: 600 }}
          kv={{
            Service: (
              <Link href={urls.user.service(booking.service)}>
                {booking.service.name}
              </Link>
            ),
            ...getReadableBookingDetails(booking),
          }}
        />
      )}
    </StatusSwitch>
  );
};
