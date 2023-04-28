import { NextPage } from "next";
import { useRouter } from "next/router";
import * as React from "react";

import { BookingAnalyticsBooking } from "components/admin/bookings/booking-analytics-booking";

const OperatorBookingPage: NextPage = () => {
  const router = useRouter();
  const bookingId = router.query.bookingId as string;

  return <BookingAnalyticsBooking bookingId={bookingId} />;
};

OperatorBookingPage.getInitialProps = () => ({});

export default OperatorBookingPage;
