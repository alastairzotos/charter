import {
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Switch,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { Box } from "@mui/system";
import {
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Chart,
  ActiveElement,
  Tooltip,
} from "chart.js";
import dayjs from "dayjs";
import { BookingDto } from "dtos";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { KeyValues } from "ui";
import { calculateBookingPrice, createPriceString, formatDate } from "utils";

import { BookingAnalyticsList } from "components/admin/bookings/booking-analytics-list";
import {
  IBookingAnalyticsDateType,
  getBookingDate,
} from "components/admin/bookings/booking-analytics.models";
import { SETTINGS_WIDTH } from "util/misc";

Chart.register(CategoryScale);
Chart.register(LinearScale);
Chart.register(PointElement);
Chart.register(LineElement);
Chart.register(Tooltip);

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

type ViewMode = "Bookings" | "Revenue";

const getLineChartValue = (bookings: BookingDto[], mode: ViewMode) => {
  if (mode === "Bookings") {
    return bookings.length;
  }

  return bookings.reduce(
    (acc, cur) =>
      acc + Math.max(calculateBookingPrice(cur.priceDetails, cur.service), 0),
    0
  );
};

export const BookingAnalytics: React.FC<Props> = ({ bookings = [] }) => {
  const [days, setDays] = useState(7);
  const [filteredBookings, setFilteredBookings] = useState<BookingDto[]>([]);
  const [selectedBookings, setSelectedBookings] = useState<BookingDto[]>([]);
  const [selectedBookingDate, setSelectedBookingDate] = useState<string | null>(
    null
  );
  const [mode, setMode] = useState<ViewMode>("Bookings");
  const [onlyShowPaidBookings, setOnlyShowPaidBookings] = useState(true);
  const [bookingDateType, setBookingDateType] =
    useState<IBookingAnalyticsDateType>("booked-on");

  const setDefaultBookingDate = () =>
    setSelectedBookingDate(`last ${days} days`);

  useEffect(() => {
    const today = dayjs();
    const startDate = today.subtract(days, "days");

    const currentBookings = (bookings || []).filter((booking) => {
      if (!booking.service) {
        return false;
      }

      if (onlyShowPaidBookings && booking.status !== "confirmed") {
        return false;
      }

      const bookingDate = getBookingDate(booking, bookingDateType);

      return (
        (bookingDate.isAfter(startDate) || bookingDate.isSame(startDate)) &&
        (bookingDate.isBefore(today) || bookingDate.isSame(today))
      );
    });

    setFilteredBookings(currentBookings);
    setSelectedBookings(currentBookings);
    setDefaultBookingDate();
  }, [days, onlyShowPaidBookings, bookingDateType]);

  const handleChangeTimeframe = (e: SelectChangeEvent) => {
    setDays(parseInt(e.target.value, 10));
  };

  const totalPrice = filteredBookings
    .map((booking) =>
      Math.max(calculateBookingPrice(booking.priceDetails, booking.service), 0)
    )
    .reduce((acc, cur) => acc + cur, 0);

  const lineData = bookingsPerDate(filteredBookings, days);

  const handleClickPoint = (elements: ActiveElement[]) => {
    if (!elements || !elements.length) {
      setSelectedBookings(filteredBookings);
      setDefaultBookingDate();
      return;
    }

    const index = elements[0].index;
    if (lineData) {
      setSelectedBookings(Object.values(lineData)[index]);
      setSelectedBookingDate(
        `${formatDate(new Date(Object.keys(lineData)[index]))}`
      );
    }
  };

  return (
    <>
      <Box sx={{ maxWidth: SETTINGS_WIDTH }}>
        <Box sx={{ display: "flex", gap: 2 }}>
          <FormControl sx={{ mb: 3, flex: 1 }}>
            <InputLabel id="time-frame-label">Time frame</InputLabel>
            <Select
              size="small"
              labelId="time-frame-label"
              label="Time frame"
              value={`${days}`}
              onChange={handleChangeTimeframe}
            >
              <MenuItem value={7}>7 days</MenuItem>
              <MenuItem value={30}>30 days</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ mb: 3, flex: 1 }}>
            <InputLabel id="date-type-label">Date type</InputLabel>
            <Select
              size="small"
              labelId="date-type-label"
              label="Date type"
              value={bookingDateType}
              onChange={(e) =>
                setBookingDateType(e.target.value as IBookingAnalyticsDateType)
              }
            >
              <MenuItem value={"booked-on"}>Booked on</MenuItem>
              <MenuItem value={"booked-for"}>Booked for</MenuItem>
            </Select>
          </FormControl>

          <FormControlLabel
            sx={{ width: 300, mb: 3 }}
            label="Paid bookings"
            control={
              <Switch
                defaultChecked
                value={onlyShowPaidBookings}
                onChange={(e) => setOnlyShowPaidBookings(e.target.checked)}
              />
            }
          />
        </Box>

        <KeyValues
          sx={{ mb: 3 }}
          kv={{
            [`Total booking price for last ${days} days`]:
              createPriceString(totalPrice),
          }}
        />

        {lineData && (
          <>
            <Box
              sx={{
                width: SETTINGS_WIDTH,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <ToggleButtonGroup
                size="small"
                exclusive
                onChange={(_, newMode) => setMode(newMode)}
                value={mode}
                sx={{ mb: 2 }}
              >
                <ToggleButton value="Bookings">Bookings</ToggleButton>
                <ToggleButton value="Revenue">Revenue</ToggleButton>
              </ToggleButtonGroup>
            </Box>
            <Box sx={{ width: SETTINGS_WIDTH }}>
              <Line
                style={{ height: 300, width: SETTINGS_WIDTH }}
                data={{
                  labels: Object.keys(lineData),
                  datasets: [
                    {
                      label: mode,
                      data: Object.values(lineData).map((bookings) =>
                        getLineChartValue(bookings, mode)
                      ),
                      borderColor: "rgb(75, 192, 192)",
                      backgroundColor: "rgba(255, 99, 132, 0.5)",
                      pointRadius: 3,
                      pointHoverRadius: 6,
                    },
                  ],
                }}
                options={{
                  maintainAspectRatio: true,
                  responsive: true,
                  onClick: (_, elements) => handleClickPoint(elements),
                }}
              />
            </Box>
          </>
        )}
      </Box>

      <Box sx={{ maxWidth: 1000, mt: 2 }}>
        <BookingAnalyticsList
          title={
            bookingDateType === "booked-on"
              ? `Bookings made in ${selectedBookingDate}`
              : `Bookings made for ${selectedBookingDate}`
          }
          // selectedDate={selectedBookingDate}
          bookings={selectedBookings}
          dateType={bookingDateType}
        />
      </Box>
    </>
  );
};
