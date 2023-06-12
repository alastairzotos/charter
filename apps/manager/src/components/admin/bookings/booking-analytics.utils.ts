import dayjs from "dayjs";
import { BookingDto } from "dtos";
import { calculateBookingPrice, createPriceString, formatDate } from "utils";

import { AnalyticsFilterType, AnalyticsViewMode } from "state/analytics";

export const getBookingDate = (
  booking: BookingDto,
  filterType: AnalyticsFilterType
) =>
  filterType === "completed" ? dayjs(booking.date) : dayjs(booking.bookingDate);

export const getBookingSummary = (
  booking: BookingDto,
  filterType: AnalyticsFilterType,
  includeFees: boolean
) => {
  const bookingPrice = calculateBookingPrice(
    booking.priceDetails,
    booking.service,
    includeFees
  );

  const showDate =
    filterType === "completed"
      ? `Completed on ${booking.date}`
      : `Booked on ${formatDate(booking.bookingDate)}`;

  const summaryWithName = `${showDate} - ${booking.name}`;

  const summary =
    bookingPrice >= 0
      ? `${summaryWithName} - ${createPriceString(bookingPrice)}`
      : `${summaryWithName} - No price`;

  return summary;
};

export const bookingsPerDate = (
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

export const getLineChartValue = (
  bookings: BookingDto[],
  mode: AnalyticsViewMode
) => {
  if (mode === "Bookings") {
    return bookings.length;
  }

  return bookings.reduce(
    (acc, cur) =>
      acc + Math.max(calculateBookingPrice(cur.priceDetails, cur.service), 0),
    0
  );
};
