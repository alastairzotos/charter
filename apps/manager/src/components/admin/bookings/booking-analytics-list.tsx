import { Grid, List, Typography } from "@mui/material";
import { BookingDto } from "dtos";
import React, { useState } from "react";

import { BookingAnalyticsBooking } from "components/admin/bookings/booking-analytics-booking";
import { BookingAnalyticsListItem } from "components/admin/bookings/booking-analytics-list-item";

interface Props {
  selectedDate: string | null;
  bookings: BookingDto[];
}

export const BookingAnalyticsList: React.FC<Props> = ({
  selectedDate,
  bookings,
}) => {
  const [selectedBooking, setSelectedBooking] = useState<BookingDto | null>(
    null
  );

  return (
    <Grid container>
      <Grid item xs={5}>
        {selectedDate && <Typography>Bookings for {selectedDate}</Typography>}

        <List dense>
          {bookings
            .slice()
            .reverse()
            .map((booking) => (
              <BookingAnalyticsListItem
                key={booking._id}
                selected={
                  !!selectedBooking && selectedBooking._id === booking._id
                }
                booking={booking}
                onClick={() => setSelectedBooking(booking)}
              />
            ))}
          {bookings.length === 0 && (
            <Typography variant="caption">
              No bookings for selected date
            </Typography>
          )}
        </List>
      </Grid>

      <Grid item xs={7}>
        {selectedBooking && (
          <BookingAnalyticsBooking bookingId={selectedBooking._id} />
        )}
      </Grid>
    </Grid>
  );
};
