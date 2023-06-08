import dayjs from "dayjs";
import { BookingDto } from "dtos";
import { calculateBookingPrice, createPriceString, formatDate } from "utils";

export type BookingFilterType = "placed" | "completed";

export const getBookingDate = (
  booking: BookingDto,
  filterType: BookingFilterType
) =>
  filterType === "completed" ? dayjs(booking.date) : dayjs(booking.bookingDate);

export const getBookingSummary = (
  booking: BookingDto,
  filterType: BookingFilterType,
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
