import { Box, Grid, List, Typography } from "@mui/material";
import { BookingDto } from "dtos";
import React, { useState } from "react";

import { BookingAnalyticsBooking } from "components/admin/bookings/booking-analytics-booking";
import { BookingAnalyticsListItem } from "components/admin/bookings/booking-analytics-list-item";
import { IBookingAnalyticsDateType } from "components/admin/bookings/booking-analytics.models";

interface Props {
  title: string;
  bookings: BookingDto[];
  dateType: IBookingAnalyticsDateType;
}

export const BookingAnalyticsList: React.FC<Props> = ({
  title,
  bookings,
  dateType,
}) => {
  const [selectedBooking, setSelectedBooking] = useState<BookingDto | null>(
    null
  );

  return (
    <Box>
      <Typography>{title}</Typography>

      <Grid container>
        <Grid item xs={5}>
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
                  dateType={dateType}
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
    </Box>
  );
};
