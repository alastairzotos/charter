import {
  FormControl,
  InputLabel,
  List,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import dayjs from "dayjs";
import { BookingDto } from "dtos";
import React, { useEffect, useState } from "react";
import { calculateBookingPrice, createPriceString } from "utils";

import { BookingAnalyticsListItem } from "components/booking-analytics/list-item";
import { KeyValues } from "components/key-values";

interface Props {
  operatorId: string;
  bookings: BookingDto[];
}

export const BookingAnalyticsList: React.FC<Props> = ({
  operatorId,
  bookings,
}) => {
  const [days, setDays] = useState(30);
  const [filteredBookings, setFilteredBookings] = useState<BookingDto[]>([]);

  useEffect(() => {
    setFilteredBookings(
      bookings?.filter((booking) =>
        dayjs(booking.date).isAfter(dayjs().subtract(days, "days"))
      ) || []
    );
  }, [days]);

  const handleChangeTimeframe = (e: SelectChangeEvent) => {
    setDays(parseInt(e.target.value, 10));
  };

  const totalPrice = filteredBookings
    .map((booking) =>
      calculateBookingPrice(booking.priceDetails, booking.service)
    )
    .filter((price) => price >= 0)
    .reduce((acc, cur) => acc + cur, 0);

  return (
    <Box sx={{ width: 400 }}>
      <FormControl sx={{ mb: 3, width: "100%" }}>
        <InputLabel id="select-label">Time frame</InputLabel>
        <Select
          size="small"
          labelId="select-label"
          label="Time frame"
          value={`${days}`}
          onChange={handleChangeTimeframe}
        >
          <MenuItem value={7}>7 days</MenuItem>
          <MenuItem value={30}>30 days</MenuItem>
        </Select>
      </FormControl>

      <KeyValues
        sx={{ mb: 3 }}
        kv={{
          [`Total booking price for last ${days} days`]:
            createPriceString(totalPrice),
        }}
      />

      <List dense>
        {filteredBookings
          .slice()
          .reverse()
          .map((booking) => (
            <BookingAnalyticsListItem
              key={booking._id}
              operatorId={operatorId}
              booking={booking}
            />
          ))}
        {filteredBookings.length === 0 && (
          <Typography variant="caption">
            No bookings for selected time frame
          </Typography>
        )}
      </List>
    </Box>
  );
};
