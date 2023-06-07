import dayjs from "dayjs";
import { BookingDto } from "dtos";

export type IBookingAnalyticsDateType = "booked-on" | "booked-for";

export const getBookingDate = (
  booking: BookingDto,
  dateType: IBookingAnalyticsDateType
) =>
  dateType === "booked-for" ? dayjs(booking.date) : dayjs(booking.bookingDate);
