import { Box, Grid, List, Typography } from "@mui/material";
import { BookingDto } from "dtos";
import React, { useState } from "react";

import { BookingAnalyticsBooking } from "components/admin/bookings/booking-analytics-booking";
import { BookingAnalyticsCopy } from "components/admin/bookings/booking-analytics-copy";
import { BookingAnalyticsListItem } from "components/admin/bookings/booking-analytics-list-item";
import { AnalyticsFilterType } from "state/analytics";

interface Props {
  title: string;
  bookings: BookingDto[];
  filterType: AnalyticsFilterType;
  totalPrice: string;
}

export const BookingAnalyticsList: React.FC<Props> = ({
  title,
  bookings,
  filterType,
  totalPrice,
}) => {
  const [selectedBooking, setSelectedBooking] = useState<BookingDto | null>(
    null
  );

  return (
    <Box>
      <Box sx={{ display: "flex", gap: 2 }}>
        <Typography>{title}</Typography>
        <BookingAnalyticsCopy
          title={title}
          bookings={bookings}
          filterType={filterType}
          totalPrice={totalPrice}
        />
      </Box>

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
                  filterType={filterType}
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
