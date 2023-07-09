import RefreshIcon from "@mui/icons-material/Refresh";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
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
import { BookingDto, BookingStatus } from "dtos";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { KeyValues } from "ui";
import { calculateBookingPrice, createPriceString, formatDate } from "utils";

import { BookingAnalyticsList } from "components/admin/bookings/booking-analytics-list";
import {
  bookingsPerDate,
  getBookingDate,
  getLineChartValue,
} from "components/admin/bookings/booking-analytics.utils";
import { AnalyticsFilterType, useAnalyticsSettings } from "state/analytics";
import { SETTINGS_WIDTH } from "util/misc";

Chart.register(CategoryScale);
Chart.register(LinearScale);
Chart.register(PointElement);
Chart.register(LineElement);
Chart.register(Tooltip);

interface Props {
  bookings: BookingDto[] | null;
  onRefresh: () => void;
}

const dayRanges = [2, 7, 14, 28];

export const BookingAnalytics: React.FC<Props> = ({
  bookings = [],
  onRefresh,
}) => {
  const [selectedBookingDate, setSelectedBookingDate] = useState<string | null>(
    null
  );

  const { days, mode, filterType, bookingStatus, init, updateSettings } =
    useAnalyticsSettings();

  const [filteredBookings, setFilteredBookings] = useState<BookingDto[]>([]);
  const [selectedBookings, setSelectedBookings] = useState<BookingDto[]>([]);

  const setDefaultBookingDate = () =>
    setSelectedBookingDate(`last ${days} days`);

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    const today = dayjs();
    const startDate = today.subtract(days, "days");

    const currentBookings = (bookings || []).filter((booking) => {
      if (!booking.service) {
        return false;
      }

      if (booking.status !== bookingStatus) {
        return false;
      }

      if (
        bookingStatus === "pending" &&
        booking.setupIntentStatus !== "succeeded"
      ) {
        return false;
      }

      const bookingDate = getBookingDate(booking, filterType);

      return (
        (bookingDate.isAfter(startDate) || bookingDate.isSame(startDate)) &&
        (bookingDate.isBefore(today) || bookingDate.isSame(today))
      );
    });

    if (filterType === "completed") {
      currentBookings.sort((a, b) => dayjs(a.date).diff(dayjs(b.date)));
    } else {
      currentBookings.sort((a, b) =>
        dayjs(a.bookingDate).diff(dayjs(b.bookingDate))
      );
    }

    setFilteredBookings(currentBookings);
    setSelectedBookings(currentBookings);
    setDefaultBookingDate();
  }, [days, bookingStatus, filterType]);

  const handleChangeTimeframe = (e: SelectChangeEvent) => {
    updateSettings({ days: parseInt(e.target.value, 10) });
  };

  const getTotalPrice = (includeFees: boolean) =>
    filteredBookings
      .map((booking) =>
        Math.max(
          calculateBookingPrice(
            booking.priceDetails,
            booking.service,
            includeFees
          ),
          0
        )
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
              {dayRanges.map((range) => (
                <MenuItem key={range} value={range}>
                  {range} days
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ mb: 3, flex: 1 }}>
            <InputLabel id="filter-type-label">Filter type</InputLabel>
            <Select
              size="small"
              labelId="filter-type-label"
              label="Filter type"
              value={filterType}
              onChange={(e) =>
                updateSettings({
                  filterType: e.target.value as AnalyticsFilterType,
                })
              }
            >
              <MenuItem value={"placed"}>Recently placed bookings</MenuItem>
              <MenuItem value={"completed"}>Recently visited bookings</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ mb: 3, flex: 1 }}>
            <InputLabel id="filter-type-label">Booking status</InputLabel>
            <Select
              size="small"
              labelId="filter-type-label"
              label="Booking status"
              value={bookingStatus}
              onChange={(e) =>
                updateSettings({
                  bookingStatus: e.target.value as BookingStatus,
                })
              }
            >
              <MenuItem value={"confirmed"}>Confirmed bookings</MenuItem>
              <MenuItem value={"pending"}>Pending bookings</MenuItem>
              <MenuItem value={"rejected"}>Rejected bookings</MenuItem>
            </Select>
          </FormControl>

          <Button
            size="small"
            variant="outlined"
            sx={{ borderRadius: 0, width: 40, height: 40 }}
            onClick={onRefresh}
          >
            <RefreshIcon fontSize="small" />
          </Button>
        </Box>

        <KeyValues
          sx={{ mb: 3 }}
          kv={{
            [`Total booking price for last ${days} days`]: createPriceString(
              getTotalPrice(true)
            ),
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
                onChange={(_, newMode) => updateSettings({ mode: newMode })}
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
            filterType === "placed"
              ? `Bookings placed in ${selectedBookingDate}`
              : `Bookings visited in ${selectedBookingDate}`
          }
          bookings={selectedBookings}
          filterType={filterType}
          totalPrice={createPriceString(getTotalPrice(false))}
        />
      </Box>
    </>
  );
};
