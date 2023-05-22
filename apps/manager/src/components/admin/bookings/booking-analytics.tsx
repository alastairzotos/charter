import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { Box } from "@mui/system";
import {
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Chart,
  ActiveElement,
} from "chart.js";
import dayjs from "dayjs";
import { BookingDto } from "dtos";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { KeyValues } from "ui";
import { calculateBookingPrice, createPriceString } from "utils";

import { BookingAnalyticsList } from "components/admin/bookings/booking-analytics-list";
import { SETTINGS_WIDTH } from "util/misc";

Chart.register(CategoryScale);
Chart.register(LinearScale);
Chart.register(PointElement);
Chart.register(LineElement);

interface Props {
  bookings: BookingDto[] | null;
}

const bookingsPerDate = (
  bookings: BookingDto[],
  days: number
): Record<string, BookingDto[]> | null => {
  if (!bookings || !bookings.length) {
    return null;
  }

  const today = dayjs();
  const startDate = today.subtract(days, "days");

  const bookingsPerDate: Record<string, BookingDto[]> = {};

  for (
    let date = startDate;
    date.isBefore(today) || date.isSame(today);
    date = date.add(1, "day")
  ) {
    const dateString = date.format("DD/MM/YYYY");

    bookingsPerDate[dateString] = bookings.filter(
      (booking) =>
        dayjs(booking.bookingDate).format("DD/MM/YYYY") === dateString
    );
  }

  return bookingsPerDate;
};

export const BookingAnalytics: React.FC<Props> = ({ bookings = [] }) => {
  const [days, setDays] = useState(30);
  const [filteredBookings, setFilteredBookings] = useState<BookingDto[]>([]);
  const [selectedBookings, setSelectedBookings] = useState<BookingDto[]>([]);
  const [selectedBookingDate, setSelectedBookingDate] = useState<string | null>(
    null
  );

  useEffect(() => {
    const currentBookings =
      bookings?.filter(
        (booking) =>
          !!booking.service &&
          dayjs(booking.date).isAfter(dayjs().subtract(days, "days"))
      ) || [];

    setFilteredBookings(currentBookings);
    setSelectedBookings(currentBookings);
    setSelectedBookingDate(`last ${days} days`);
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

  const lineData = bookingsPerDate(filteredBookings, days);

  const handleClickPoint = (elements: ActiveElement[]) => {
    if (!elements || !elements.length) {
      setSelectedBookings(filteredBookings);
      setSelectedBookingDate(`Last ${days} days`);
      return;
    }

    const index = elements[0].index;
    if (lineData) {
      setSelectedBookings(Object.values(lineData)[index]);
      setSelectedBookingDate(Object.keys(lineData)[index]);
    }
  };

  return (
    <>
      <Box sx={{ maxWidth: SETTINGS_WIDTH }}>
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

        {lineData && (
          <Box sx={{ height: 300, width: SETTINGS_WIDTH }}>
            <Line
              data={{
                labels: Object.keys(lineData),
                datasets: [
                  {
                    label: "Bookings",
                    data: Object.values(lineData).map(
                      (bookings) => bookings.length
                    ),
                    borderColor: "rgb(75, 192, 192)",
                    pointRadius: 3,
                    pointHoverRadius: 6,
                  },
                ],
              }}
              options={{
                onClick: (_, elements) => handleClickPoint(elements),
              }}
            />
          </Box>
        )}
      </Box>

      <Box sx={{ maxWidth: 1000, mt: 2 }}>
        <BookingAnalyticsList
          selectedDate={selectedBookingDate}
          bookings={selectedBookings}
        />
      </Box>
    </>
  );
};
